import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// import icons from 'bundle-text:../img/icons.svg';

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const getRecipe = async function () {

  const id = window.location.hash.slice(1);
console.log(id);
  //? not id, do nothing
  if (!id) return;
  recipeView.renderSpinner();
  // renderSpinner(recipeContainer);

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


// ["hashchange", "load"].forEach(ev => window.addEventListener(ev, getRecipe));

window.addEventListener('hashchange', getRecipe);
window.addEventListener('load', getRecipe);

