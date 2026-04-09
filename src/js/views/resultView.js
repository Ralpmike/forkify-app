import View from '../view';

class ResultView extends View {
  _parentElem = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query. Please try again! :)';
  _successMessage = '';

  _generateMarkUp() {
    const markUp = this._data.map(this._generateSearchMarkUp).join('');

    return markUp;
  }

  _generateSearchMarkUp(recipe) {
    const id = window.location.hash.slice(1);
    const isSlected = recipe.id === id
    return `
      <li class="preview">
              <a class="preview__link ${isSlected && 'preview__link--active'}" href="#${recipe.id}">
                <figure class="preview__fig">
                  <img src="${recipe.imageUrl}" alt="${recipe.title}" />
                </figure>
                <div class="preview__data">
                  <h4 class="preview__title">${recipe.title}</h4>
                  <p class="preview__publisher">${recipe?.publisher}</p>
                </div>
              </a>
            </li>`;
  }
}

export default new ResultView();
