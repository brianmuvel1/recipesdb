/* empty css                                 */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute, d as createAstro, a as renderComponent } from '../chunks/astro/server_CtnJa5XY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_D8AqC2yr.mjs';
import 'clsx';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$RecipeCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$RecipeCard;
  const { title, image, ingredients, directions, category } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"> ${image && renderTemplate`<img${addAttribute(image, "src")}${addAttribute(title, "alt")} class="w-full h-48 object-cover">`} <div class="p-6"> <h2 class="text-2xl font-bold mb-3">${title}</h2> <div class="flex flex-wrap gap-2 mb-4"> ${category.map((cat) => renderTemplate`<span class="category-chip px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"> ${cat} </span>`)} </div> <div class="mb-4"> <h3 class="font-semibold mb-2">Ingredients:</h3> <ul class="ingredients list-disc list-inside space-y-1"> ${ingredients.map((ingredient) => renderTemplate`<li class="text-gray-600">${ingredient}</li>`)} </ul> </div> <div> <h3 class="font-semibold mb-2">Directions:</h3> <ol class="directions list-decimal list-inside space-y-1"> ${directions.map((step) => renderTemplate`<li class="text-gray-600">${step}</li>`)} </ol> </div> </div> </article>`;
}, "/home/project/src/components/RecipeCard.astro", void 0);

const $$Astro = createAstro();
const $$SearchBar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SearchBar;
  const { categories } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="max-w-xl mx-auto mb-8 space-y-4"> <div class="relative"> <div id="searchContainer" class="w-full min-h-[42px] px-4 py-2 rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 flex flex-wrap gap-2 items-center cursor-text"> <div id="chips" class="flex flex-wrap gap-2"></div> <input type="text" id="search" placeholder="Search recipes (separate terms with commas)..." class="flex-1 outline-none min-w-[200px]"> </div> </div> <div class="flex flex-wrap gap-2"> ${categories.map((category) => renderTemplate`<button class="category-filter px-3 py-1 bg-gray-200 hover:bg-blue-100 text-gray-700 hover:text-blue-800 rounded-full text-sm transition-colors"${addAttribute(category, "data-category")}> ${category} </button>`)} </div> </div> `;
}, "/home/project/src/components/SearchBar.astro", void 0);

async function loadAllRecipes() {
  const dataPath = join(fileURLToPath(new URL("..", import.meta.url)), "data");
  const files = await readdir(dataPath);
  const jsonFiles = files.filter((file) => file.endsWith(".json"));
  const recipes = [];
  for (const file of jsonFiles) {
    const module = await import(`../data/${file}`);
    if (module.default?.recipes) {
      recipes.push(...module.default.recipes);
    }
  }
  return recipes;
}

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const recipes = await loadAllRecipes();
  const allCategories = [...new Set(recipes.flatMap((recipe) => recipe.category))];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Recipe Website" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container mx-auto px-4 py-8"> <h1 class="text-4xl font-bold text-center mb-8">Delicious Recipes</h1> ${renderComponent($$result2, "SearchBar", $$SearchBar, { "categories": allCategories })} <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${recipes.map((recipe) => renderTemplate`${renderComponent($$result2, "RecipeCard", $$RecipeCard, { "title": recipe.title, "image": recipe.image, "ingredients": recipe.ingredients, "directions": recipe.directions, "category": recipe.category })}`)} </div> </main> ` })}`;
}, "/home/project/src/pages/index.astro", void 0);

const $$file = "/home/project/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
