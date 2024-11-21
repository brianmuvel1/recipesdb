import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get("recipeFile");
    if (!file) {
      return new Response(
        JSON.stringify({ message: "No file uploaded" }),
        { status: 400 }
      );
    }
    if (!file.name.endsWith(".json")) {
      return new Response(
        JSON.stringify({ message: "Only JSON files are allowed" }),
        { status: 400 }
      );
    }
    const content = await file.text();
    try {
      const json = JSON.parse(content);
      if (!json.recipes || !Array.isArray(json.recipes)) {
        throw new Error("Invalid recipe file structure");
      }
    } catch (error) {
      return new Response(
        JSON.stringify({ message: "Invalid JSON format" }),
        { status: 400 }
      );
    }
    const dataPath = join(fileURLToPath(new URL("../../data", import.meta.url)));
    const filePath = join(dataPath, file.name);
    await writeFile(filePath, content);
    return new Response(
      JSON.stringify({ message: "Recipe file uploaded successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return new Response(
      JSON.stringify({ message: "Error uploading file" }),
      { status: 500 }
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
