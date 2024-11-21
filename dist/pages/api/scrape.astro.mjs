import { load } from 'cheerio';
import crossFetch from 'cross-fetch';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';
import { HttpsProxyAgent } from 'https-proxy-agent';
export { renderers } from '../../renderers.mjs';

const RecipeSchema = z.object({
  title: z.string().min(1),
  category: z.array(z.string()),
  ingredients: z.array(z.string()).min(1),
  directions: z.array(z.string()).min(1)
});
async function fetchWithRetry(url, maxRetries = 3) {
  let lastError = null;
  for (let i = 0; i < maxRetries; i++) {
    try {
      const headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Connection": "keep-alive"
      };
      try {
        const response2 = await crossFetch(url, { headers });
        if (response2.ok) return response2;
      } catch (directError) {
        console.warn("Direct fetch failed, trying with proxy...", directError);
      }
      const proxyUrl = process.env.HTTP_PROXY || "http://proxy.example.com:8080";
      const agent = new HttpsProxyAgent(proxyUrl);
      const response = await crossFetch(url, {
        agent,
        headers,
        timeout: 1e4
        // 10 seconds timeout
      });
      if (response.ok) return response;
      lastError = new Error(`HTTP error! status: ${response.status}`);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Unknown error occurred");
      if (i === maxRetries - 1) break;
      await new Promise((resolve) => setTimeout(resolve, 1e3 * (i + 1)));
    }
  }
  throw lastError || new Error("Failed to fetch after multiple retries");
}
async function scrapeRecipe(url) {
  try {
    const response = await fetchWithRetry(url);
    const html = await response.text();
    const $ = load(html);
    const title = $('h1, .recipe-title, [class*="title"], .heading-title, [itemprop="name"]').first().text().trim();
    const categorySelectors = [
      ".recipe-category",
      ".category",
      '[class*="category"]',
      ".tags",
      ".recipe-tags",
      '[itemprop="recipeCategory"]'
    ];
    const category = $(categorySelectors.join(", ")).find("a, span, li").map((_, el) => $(el).text().trim()).get().filter(Boolean);
    const ingredientSelectors = [
      ".ingredients li",
      ".ingredient-list li",
      '[class*="ingredient"]',
      '[itemprop="recipeIngredient"]',
      ".recipe-ingredients li"
    ];
    const ingredients = $(ingredientSelectors.join(", ")).map((_, el) => $(el).text().trim()).get().filter(Boolean);
    const directionSelectors = [
      ".directions li",
      ".instructions li",
      ".steps li",
      '[class*="instruction"]',
      '[class*="direction"]',
      '[class*="step"]',
      '[itemprop="recipeInstructions"]'
    ];
    const directions = $(directionSelectors.join(", ")).map((_, el) => $(el).text().trim()).get().filter(Boolean);
    const recipe = {
      title: title || "Untitled Recipe",
      category: category.length ? [...new Set(category)] : ["Uncategorized"],
      ingredients: [...new Set(ingredients)],
      directions: directions.filter((d) => d.length > 5)
      // Remove very short directions
    };
    return RecipeSchema.parse(recipe);
  } catch (error) {
    console.error("Error scraping recipe:", error);
    throw new Error(
      error instanceof Error ? `Failed to scrape recipe: ${error.message}` : "Failed to scrape recipe"
    );
  }
}
async function scrapeMultipleRecipes(url) {
  try {
    const response = await fetchWithRetry(url);
    const html = await response.text();
    const $ = load(html);
    const recipeLinks = /* @__PURE__ */ new Set();
    $("a").each((_, el) => {
      const href = $(el).attr("href");
      if (!href) return;
      const isRecipeLink = href.includes("recipe") || href.includes("recipes") || $(el).hasClass("recipe-card") || $(el).hasClass("recipe-link") || $(el).parents(".recipe-card, .recipe-list").length > 0;
      if (isRecipeLink) {
        try {
          const fullUrl = new URL(href, url).toString();
          recipeLinks.add(fullUrl);
        } catch (error) {
          console.warn("Invalid URL:", href);
        }
      }
    });
    if (recipeLinks.size === 0) {
      throw new Error("No recipe links found on the page");
    }
    const recipes = [];
    const errors = [];
    const links = Array.from(recipeLinks).slice(0, 50);
    const batchSize = 5;
    for (let i = 0; i < links.length; i += batchSize) {
      const batch = links.slice(i, i + batchSize);
      const batchResults = await Promise.allSettled(
        batch.map((link) => scrapeRecipe(link))
      );
      batchResults.forEach((result, index) => {
        if (result.status === "fulfilled") {
          recipes.push(result.value);
        } else {
          errors.push(`Failed to scrape recipe from ${batch[index]}: ${result.reason}`);
        }
      });
      if (i + batchSize < links.length) {
        await new Promise((resolve) => setTimeout(resolve, 1e3));
      }
    }
    if (recipes.length === 0) {
      throw new Error("Failed to scrape any recipes. Errors: " + errors.join("; "));
    }
    return recipes;
  } catch (error) {
    console.error("Error scraping multiple recipes:", error);
    throw error;
  }
}
async function saveRecipes(recipes) {
  const dataPath = join(fileURLToPath(new URL("..", import.meta.url)), "data");
  const scrapedPath = join(dataPath, "scraped.json");
  try {
    let existingData = { recipes: [] };
    try {
      const existingContent = await readFile(scrapedPath, "utf-8");
      existingData = JSON.parse(existingContent);
    } catch (error) {
    }
    const uniqueRecipes = recipes.filter(
      (newRecipe) => !existingData.recipes.some(
        (existingRecipe) => existingRecipe.title.toLowerCase() === newRecipe.title.toLowerCase()
      )
    );
    existingData.recipes.push(...uniqueRecipes);
    await writeFile(scrapedPath, JSON.stringify(existingData, null, 2));
    return uniqueRecipes.length;
  } catch (error) {
    console.error("Error saving recipes:", error);
    throw new Error(
      error instanceof Error ? `Failed to save recipes: ${error.message}` : "Failed to save recipes"
    );
  }
}

const prerender = false;
const POST = async ({ request }) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  if (request.method === "OPTIONS") {
    return new Response(null, { headers, status: 204 });
  }
  try {
    const body = await request.json();
    const { url, type } = body;
    if (!url) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "URL is required"
        }),
        { status: 400, headers }
      );
    }
    try {
      new URL(url);
    } catch {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid URL format"
        }),
        { status: 400, headers }
      );
    }
    if (type === "single") {
      const recipe = await scrapeRecipe(url);
      const savedCount = await saveRecipes([recipe]);
      return new Response(
        JSON.stringify({
          success: true,
          message: savedCount ? "Recipe scraped and saved successfully" : "Recipe already exists",
          count: savedCount
        }),
        { status: 200, headers }
      );
    } else if (type === "multiple") {
      const recipes = await scrapeMultipleRecipes(url);
      const savedCount = await saveRecipes(recipes);
      return new Response(
        JSON.stringify({
          success: true,
          message: `Successfully scraped ${recipes.length} recipes (${savedCount} new)`,
          count: savedCount
        }),
        { status: 200, headers }
      );
    }
    return new Response(
      JSON.stringify({
        success: false,
        message: "Invalid scrape type"
      }),
      { status: 400, headers }
    );
  } catch (error) {
    console.error("Scraping error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: error instanceof Error ? error.message : "Failed to scrape recipe"
      }),
      { status: 500, headers }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
