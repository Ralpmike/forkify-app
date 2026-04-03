
import { BASE_URL } from "../constants.js";

export const state = {
    recipe: {},
}

export const loadRecipe = async function (id) {

    try {
        const response = await fetch(`${BASE_URL}/${id}`)
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`${data.message} (${response.status})`);
        }
        
        const { recipe } = data.data;

        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            imageUrl: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        };
    } catch (err) {
        throw err;
    }
}