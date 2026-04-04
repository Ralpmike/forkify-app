import icons from 'url:../../img/icons.svg';

class SearchView {
  #parentElem = document.querySelector('.search');
  #search = document.querySelector('.results');
  #data;

  render(data) {
    this.#data = data;
    this.#clear();
    const markup = this.#data.map(this.#renderSearchMarkUp).join('');
    this.#search.insertAdjacentHTML('beforeend', markup);
  }

  #clear (){
    this.#search.innerHTML = '';
  }

  getQuery() {
    const query = this.#parentElem.querySelector('.search__field').value;
    console.log(query);
    return query;
  }

  #clearInput() {
    this.#parentElem.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this.#parentElem.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
    this.#clearInput
  }

  #renderSearchMarkUp(recipe) {
    return `
      <li class="preview">
              <a class="preview__link preview__link--active" href="#${
                recipe.id
              }">
                <figure class="preview__fig">
                  <img src="${recipe.imageUrl}" alt="${recipe.title}" />
                </figure>
                <div class="preview__data">
                  <h4 class="preview__title">${recipe.title}</h4>
                  <p class="preview__publisher">${recipe?.publisher}</p>
                  <div class="preview__user-generated">
                    <svg>
                      <use href="${icons}#icon-user"></use>
                    </svg>
                  </div>
                </div>
              </a>
            </li>`;
  }
}


export default new SearchView();