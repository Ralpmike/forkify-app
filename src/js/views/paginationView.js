import View from '../view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElem = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElem.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) {
        return;
      }
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkUp() {
    const numberOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
      const currentPage = this._data.page;

    console.log(numberOfPages);

    return this._generateMarkupButton(currentPage, numberOfPages);
  }

  _generateMarkupButton(currentPage, numberOfPages
  ) {
    const previousBtn = `
    <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1} </span>
    </button>
    `;
    const nextBtn = `
    <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
    `;

    if(currentPage === 1 && numberOfPages > 1) return nextBtn;

    if(currentPage === numberOfPages && numberOfPages > 1) return previousBtn;

    if(currentPage < numberOfPages) return previousBtn + nextBtn;
    
    if(currentPage === 1 && numberOfPages === 1) return '';
  }
}

export default new PaginationView();
