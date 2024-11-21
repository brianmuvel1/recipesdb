import type { APIRoute } from 'astro';
import { saveMultipleRecipes } from '../../utils/db';
import type { Recipe } from '../../utils/db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { content } = await request.json();
    
    if (!content) {
      return new Response(
        JSON.stringify({ message: 'No JSON content provided' }), 
        { status: 400 }
      );
    }

    // Validate JSON structure
    let recipes: Recipe[];
    try {
      const json = JSON.parse(content);
      if (!json.recipes || !Array.isArray(json.recipes)) {
        throw new Error('Invalid recipe file structure');
      }
      recipes = json.recipes;
    } catch (error) {
      return new Response(
        JSON.stringify({ message: 'Invalid JSON format or structure' }), 
        { status: 400 }
      );
    }

    const savedCount = await saveMultipleRecipes(recipes);

    return new Response(
      JSON.stringify({ 
        message: `Successfully saved ${savedCount} recipes to the database` 
      }), 
      { status: 200 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return new Response(
      JSON.stringify({ message: 'Error uploading JSON content' }), 
      { status: 500 }
    );
  }
}