/* empty css                                 */
import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_CtnJa5XY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_D8AqC2yr.mjs';
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Admin = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Recipe Admin" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container mx-auto px-4 py-8"> <div class="flex justify-between items-center mb-8"> <h1 class="text-4xl font-bold">Recipe Admin</h1> <a href="/" class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path> </svg>
Home
</a> </div> <div class="grid gap-8 md:grid-cols-2"> <div class="bg-white rounded-lg shadow-md p-6"> <h2 class="text-2xl font-semibold mb-4">Upload Recipe File</h2> <form action="/api/upload" method="POST" enctype="multipart/form-data" class="space-y-6" id="recipeFileForm"> <div> <label class="block text-sm font-medium text-gray-700 mb-2">
Upload Recipe JSON File
</label> <input type="file" name="recipeFile" accept=".json" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"> </div> <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
Upload Recipe File
</button> </form> <div id="fileMessage" class="mt-4 text-center hidden"></div> </div> <div class="bg-white rounded-lg shadow-md p-6"> <h2 class="text-2xl font-semibold mb-4">Paste Recipe JSON</h2> <form action="/api/upload-json" method="POST" class="space-y-6" id="recipeJsonForm"> <div> <label class="block text-sm font-medium text-gray-700 mb-2">
Recipe JSON Content
</label> <textarea name="jsonContent" required rows="10" placeholder="Paste your recipe JSON here..." class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea> </div> <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
Upload JSON Content
</button> </form> <div id="jsonMessage" class="mt-4 text-center hidden"></div> </div> </div> </main> ` })} `;
}, "/home/project/src/pages/admin.astro", void 0);

const $$file = "/home/project/src/pages/admin.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Admin,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
