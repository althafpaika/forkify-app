import View from "./view";
import icon from 'url:../../img/icons.svg';

class PreviewView extends View{
  _parentEl = '';
  
  _generateMarkup(){
    const id = window.location.hash.slice(1);

        return`<li class="preview">
            <a class="preview__link ${id === this._data.id?'preview__link--active': ''}" href="#${this._data.id}">
              <figure class="preview__fig">
                <img src="${this._data.img}" alt="Test" />
              </figure>
              <div class="preview__data">
              <h4 class="preview__title">${this._data.title}</h4>
              <p class="preview__publisher">${this._data.publisher}</p>
                <div class="preview__user-generated ${this._data.key?'':'hidden'}">
                  <svg>
                  <use href="${icon}#icon-user"></use>
                  </svg>
                </div>
                </div>
                </a>
          </li>
        `
  };
}

  export const previewView = new PreviewView();