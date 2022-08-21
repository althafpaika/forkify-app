import { previewView } from "./previewView";
import View from "./view";

class ResutlView extends View{
  _parentEl = document.querySelector('.results');
  _error_message = 'No recipe found 😢';
  
  _generateMarkup(){
    const id = window.location.hash.slice(1);
    return this._data.map(items=>previewView.render(items,false)).join(' ')
    }
  }
  
  export const resultView = new ResutlView();