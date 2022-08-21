import { previewView } from "./previewView";
import View from "./view";

class BookmarkView extends View{
  _parentEl = document.querySelector('.bookmarks');
  _error_message = 'pls bookmark something to see here :)';
  
  _generateMarkup(){
    return this._data.map(bookmarks=>previewView.render(bookmarks,false)).join(' ')
    }
    addHandlerRender(handler){
      window.addEventListener('load',handler)
    }
  };

  
  export const bookmarkView = new BookmarkView();