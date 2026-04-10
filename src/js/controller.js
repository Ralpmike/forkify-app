import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

// if(module.hot){
//   module.hot.accept();
// }

const controlRecipes = async function () {
  //? get id
  const id = window.location.hash.slice(1);

  //? not id, do nothing
  if (!id) return;
  recipeView.renderSpinner();

  try {
    //? Update search results
    resultView.update(model.getSearchResultsPage());

    //? Render bookmarks
    bookmarksView.render(model.state.bookmarks);

    //? load recipe
    await model.loadRecipe(id);

    //? render recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.displayErrorMessage(error.message);
  }
};

const controlSearchResults = async function () {
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

export const controlServings = function (newServings){
  //? Update the recipe servings (in state)
  model.updateServings(newServings);

  //? Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

export const controlAddBookmark = function (){

  //? Add/remove bookmark
  if(!model.state.recipe.bookmarked){
    model.addBookmark(model.state.recipe);
  }else{
    model.removeBookmark(model.state.recipe.id);
  }

  //? Update the recipe view
  recipeView.update(model.state.recipe);


  //? Render bookmarks
  bookmarksView.render(model.state.bookmarks);

}

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
};
init();
