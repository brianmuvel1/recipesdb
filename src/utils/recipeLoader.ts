import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export interface Recipe {
  title: string;
  category: string[];
  ingredients: string[];
  directions: string[];
  image?: string;
}

export async function loadAllRecipes(): Promise<Recipe[]> {
  const dataPath = join(fileURLToPath(new URL('..', import.meta.url)), 'data');
  const files = await readdir(dataPath);
  const jsonFiles = files.filter(file => file.endsWith('.json'));
  
  const recipes: Recipe[] = [];
  
  for (const file of jsonFiles) {
    try {
      const content = await readFile(join(dataPath, file), 'utf-8');
      const data = JSON.parse(content);
      if (data?.recipes && Array.isArray(data.recipes)) {
        recipes.push(...data.recipes);
      }
    } catch (error) {
      console.error(`Error loading recipe file ${file}:`, error);
    }
  }
  
  return recipes;
}