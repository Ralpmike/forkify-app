import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';

// if(module.hot){
//   module.hot.accept();
// }

const contolRecipes = async function () {
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

const controllSearchResults = async function () {
  //? get query
  const query = searchView.getQuery();
  //? if no query, do nothing
  if (!query) {
    return;
  }
  console.log(query);

  try {
    //? load search results
    resultView.renderSpinner();
    await model.loadSearchResults(query);
    //? render search results
    // resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultsPage());


    //? Render initial pagination
    paginationView.render(model.state.search);
  
  } catch (error) {
    //? render error
    resultView.displayErrorMessage(error.message);
  }
};

export const controlPagination = function (gotoPage){
  //? render new page
  resultView.render(model.getSearchResultsPage(gotoPage));

  //? Render new pagination
  paginationView.render(model.state.search);
}

const init = function () {
  recipeView.addHandlerRender(contolRecipes);
  searchView.addHandlerSearch(controllSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
