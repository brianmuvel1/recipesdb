/* empty css                                 */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute, d as createAstro, a as renderComponent } from '../chunks/astro/server_CtnJa5XY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_D8AqC2yr.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$ScraperForm = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ScraperForm;
  const { type, title, placeholder } = Astro2.props;
  const formId = `${type}RecipeForm`;
  const resultId = `${type}RecipeResult`;
  return renderTemplate`${maybeRenderHead()}<div class="bg-white rounded-lg shadow-md p-6"> <h2 class="text-2xl font-semibold mb-4">${title}</h2> <form${addAttribute(formId, "id")} class="space-y-4"> <div> <label class="block text-sm font-medium text-gray-700 mb-2">
Recipe URL
</label> <input type="url" required${addAttribute(placeholder, "placeholder")} class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"> </div> <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center" data-submit-button> <span data-button-text>Scrape Recipe${type === "multiple" ? "s" : ""}</span> <div class="hidden animate-spin ml-2" data-loading-spinner> <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle> <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg> </div> </button> </form> <div${addAttribute(resultId, "id")} class="mt-4 hidden"></div> </div>`;
}, "/home/project/src/components/ScraperForm.astro", void 0);

const prerender = false;
const $$Scrape = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Recipe Scraper" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container mx-auto px-4 py-8"> <h1 class="text-4xl font-bold text-center mb-8">Recipe Scraper</h1> <div class="max-w-2xl mx-auto space-y-8"> ${renderComponent($$result2, "ScraperForm", $$ScraperForm, { "type": "single", "title": "Scrape Single Recipe", "placeholder": "https://example.com/recipe" })} ${renderComponent($$result2, "ScraperForm", $$ScraperForm, { "type": "multiple", "title": "Scrape Multiple Recipes", "placeholder": "https://example.com/recipes" })} </div> </main> ` })} `;
}, "/home/project/src/pages/scrape.astro", void 0);

const $$file = "/home/project/src/pages/scrape.astro";
const $$url = "/scrape";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Scrape,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
