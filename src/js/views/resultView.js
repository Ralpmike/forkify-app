import View from '../view';
import previewView from './previewView';

class ResultView extends View {
  _parentElem = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query. Please try again! :)';
  _successMessage = '';

  _generateMarkUp() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }

}

export default new ResultView();
