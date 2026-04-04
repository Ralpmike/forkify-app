import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

const getRecipe = async function () {
  const id = window.location.hash.slice(1);
  //? not id, do nothing
  if (!id) return;
  recipeView.renderSpinner();

  try {
    //? load recipe
    await model.loadRecipe(id);

    //? render recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.displayErrorMessage(error.message);
  }
};


const controllSearchResults = async function(){

  //? get query
  const query = searchView.getQuery();
  //? if no query, do nothing
  if(!query) return;
  console.log(query);

  try {
    //? load search results
    await model.loadSearchResults(query);
    //? render search results
    searchView.render(model.state.search.results);
  } catch (error) {
    //? render error
    recipeView.displayErrorMessage(error.message);
  }
}

const init = function () {
  recipeView.addHandlerRender(getRecipe);
 searchView.addHandlerSearch(controllSearchResults);
};
init();
