import { sql } from '@vercel/postgres';

export interface Recipe {
  title: string;
  category: string[];
  ingredients: string[];
  directions: string[];
  image?: string;
}

export async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS recipes (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT[] NOT NULL,
        ingredients TEXT[] NOT NULL,
        directions TEXT[] NOT NULL,
        image TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

export async function getAllRecipes(): Promise<Recipe[]> {
  try {
    const { rows } = await sql`SELECT * FROM recipes ORDER BY created_at DESC;`;
    return rows.map(row => ({
      title: row.title,
      category: row.category,
      ingredients: row.ingredients,
      directions: row.directions,
      image: row.image
    }));
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}

export async function saveRecipe(recipe: Recipe) {
  try {
    await sql`
      INSERT INTO recipes (title, category, ingredients, directions, image)
      VALUES (${recipe.title}, ${recipe.category}, ${recipe.ingredients}, ${recipe.directions}, ${recipe.image || null});
    `;
    return true;
  } catch (error) {
    console.error('Error saving recipe:', error);
    return false;
  }
}

export async function saveMultipleRecipes(recipes: Recipe[]) {
  try {
    let savedCount = 0;
    for (const recipe of recipes) {
      const success = await saveRecipe(recipe);
      if (success) savedCount++;
    }
    return savedCount;
  } catch (error) {
    console.error('Error saving multiple recipes:', error);
    return 0;
  }
}