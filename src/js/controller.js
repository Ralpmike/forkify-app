import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

const getRecipe = async function () {
  const id = window.location.hash.slice(1);
  console.log(id);
  //? not id, do nothing
  if (!id) return;
  recipeView.renderSpinner();

  try {

    //? load recipe
    await model.loadRecipe(id);

    //? render recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.error(error);
    recipeView.displayErrorMessage(error.message || "No recipes found for your query. Please try again!");
  }
}


// ["load", "hashchange"].forEach(ev => window.addEventListener(ev, getRecipe));

window.addEventListener('hashchange', getRecipe);
window.addEventListener('load', getRecipe);