
class SearchView {
  _search = document.querySelector('.search');

  getQuery() {
    const query = this._search.querySelector('.search__field').value;
    console.log(query);
    this._clearInput();

    return query;
  }

  _clearInput() {
    this._search.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._search.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
