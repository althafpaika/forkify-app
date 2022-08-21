import icon from 'url:../../img/icons.svg';
export default class View{
    _data;
    /**
     * Render the received Object to the DOM
     * @param {Object | Object[]} data the data to be rendered (eg:Recipe)
     * @param {Boolean} render [render=true] if false, create markup string instead of rendering to the DOM
     * @returns {undefined | string} a markup string is returned if  render = false
     */
    render(data,render=true){
        if(!data || (Array.isArray(data) && data.length === 0)) return this.errorHandler();
        this._data = data
        const markup = this._generateMarkup();
        if(!render) return markup;
        this._clear();
        this._parentEl.insertAdjacentHTML("afterbegin",markup)
    };
    update(data){
        this._data = data
        const newMarkup = this._generateMarkup();
        const newDom = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDom.querySelectorAll('*'));
        const curElements = Array.from(this._parentEl.querySelectorAll('*'));
        newElements.forEach((newEle,i)=>{
          const curEle = curElements[i];
          // console.log(!newEle.isEqualNode(curEle) && newEle.firstChild.nodeValue.trim() !== '',i);
          if(!newEle.isEqualNode(curEle) && newEle.firstChild?.nodeValue.trim() !== '') curEle.textContent = newEle.textContent;
          if(!newEle.isEqualNode(curEle)) Array.from(newEle.attributes).forEach(att=>curEle.setAttribute(att.name,att.value));
          // console.log(curEle,newEle.isEqualNode(curEle));
        })
        // console.log(curElements);
        // console.log(newElements);
    }
    loadSpinner(){
        // this._spinnerMarkup;
        this._clear();
        const spinnerMarkup = `
        <div class="spinner">
              <svg>
                <use href="${icon}#icon-loader"></use>
              </svg>
        </div>`;
        this._parentEl.insertAdjacentHTML('afterbegin',spinnerMarkup);
    };
    
    _clear(){
        this._parentEl.innerHTML = '';
    };
    errorHandler(message = this._error_message){
        const markup = `
      <div class="error">
          <div>
            <svg>
              <use href="${icon}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
      </div>
        `
        this._clear();
        this._parentEl.insertAdjacentHTML("afterbegin",markup);
      }

      renderMessage(message = this._message){
        const markup = `
        <div class="message">
            <div>
              <svg>
                <use href="${icon}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
        </div>
          `
          this._clear();
          this._parentEl.insertAdjacentHTML("afterbegin",markup);
      }
}