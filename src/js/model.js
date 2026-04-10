import { API_URL, RES_PER_PAGE } from '../js/config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

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
    if(state.bookmarks.some(bookmark => bookmark.id === id)){
      state.recipe.bookmarked = true;
    }else{
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  state.search.query = query;
  try {
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        imageUrl: recipe.image_url,
      };
    });
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const { resultsPerPage } = state.search;
  const start = (page - 1) * resultsPerPage; //? 0
  const end = page * resultsPerPage; //? 9

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity =
      (ingredient.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {

  //?Check if a recipe is already bookmarked
  if(state.bookmarks.some(bookmark => bookmark.id === recipe.id)){
    return;
  }

  //? Add recipe to bookmarks
  state.bookmarks = [...state.bookmarks, recipe];

  //? Mark current recipe as bookmarked
  if(recipe.id === state.recipe.id){
    state.recipe.bookmarked = true;
  }
};

export const removeBookmark = function (id) {
  state.bookmarks = state.bookmarks.filter(bookmark => bookmark.id !== id);

  //? Mark current recipe as not bookmarked
  if(id === state.recipe.id){
    state.recipe.bookmarked = false;
  }
};

export const getBookmarks = function () {
  return state.bookmarks;
};
