import icons from 'url:../img/icons.svg';

export default class View {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.displayErrorMessage();
    }

    this._data = data;
    const markup = this._generateMarkUp();

    if (!render){
      return markup;
    }

    this._clear();
    this._parentElem.insertAdjacentHTML('afterbegin', markup);
  }

  update(data){
    this._data = data;
    const newRecipeMarkup = this._generateMarkUp();

    const newDom = document.createRange().createContextualFragment(newRecipeMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const currentElements = Array.from(this._parentElem.querySelectorAll('*'));


    newElements.forEach((newEl, i) => {
      const curEl = currentElements[i];
      //? Update changed TEXT
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
        // curEl.textContent = newEl.textContent; 
        curEl.replaceWith(newEl)
      }
      //? Update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
      }
    });

  }

  renderSpinner() {
    this._clear();
    const spinnerMarkup = `
        <div class="spinner">
            <svg>
                 <use href="${icons}#icon-loader"></use>
            </svg>
        </div>
  `;
    this._parentElem.insertAdjacentHTML('afterbegin', spinnerMarkup);
  }

  displayErrorMessage(message = this._errorMessage) {
    this._clear();
    const markup = `
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `;
    this._parentElem.insertAdjacentHTML('afterbegin', markup);
  }

  displaySuccessMessage(message = this._successMessage) {
    this._clear();
    const markup = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `;
    this._parentElem.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElem.innerHTML = '';
  }
}
