import View from '../view';
import previewView from './previewView';

class BookmarksView extends View {
  _parentElem = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';

  _generateMarkUp() {
    return this._data.map(bookmark => previewView.render(bookmark, false)).join('');
  }

}

export default new BookmarksView();
