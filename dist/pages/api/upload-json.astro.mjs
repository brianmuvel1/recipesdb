import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const { content } = await request.json();
    if (!content) {
      return new Response(
        JSON.stringify({ message: "No JSON content provided" }),
        { status: 400 }
      );
    }
    try {
      const json = JSON.parse(content);
      if (!json.recipes || !Array.isArray(json.recipes)) {
        throw new Error("Invalid recipe file structure");
      }
    } catch (error) {
      return new Response(
        JSON.stringify({ message: "Invalid JSON format or structure" }),
        { status: 400 }
      );
    }
    const timestamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    const filename = `newUpload-${timestamp}.json`;
    const dataPath = join(fileURLToPath(new URL("../../data", import.meta.url)));
    const filePath = join(dataPath, filename);
    await writeFile(filePath, content);
    return new Response(
      JSON.stringify({ message: "Recipe JSON uploaded successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return new Response(
      JSON.stringify({ message: "Error uploading JSON content" }),
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
