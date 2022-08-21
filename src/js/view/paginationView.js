import View from "./view";
import icon from 'url:../../img/icons.svg';
class PaginationView extends View{
    _parentEl = document.querySelector('.pagination');
    
    _generateMarkup(){
        const totalPages = Math.ceil(this._data.results.length/this._data.resultsPerPage)
        const curPage = this._data.page;
        // 1 and other pages
        if(curPage === 1 && totalPages>curPage){
            return `
            <button data-goto="${curPage+1}" class="btn--inline pagination__btn--next">
                <span>${curPage+1}</span>
                <svg class="search__icon">
                <use href="${icon}#icon-arrow-right"></use>
                </svg>
            </button>`
        }
        // other pages
        if(curPage !== 1 && curPage<totalPages){
            return `
            <button data-goto="${curPage+1}" class="btn--inline pagination__btn--next">
                <span>${curPage+1}</span>
                <svg class="search__icon">
                <use href="${icon}#icon-arrow-right"></use>
                </svg>
            </button>
            <button data-goto="${curPage-1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icon}#icon-arrow-left"></use>
                </svg>
                <span>${curPage-1}</span>
            </button>
            `
        }
        //last page
        if(curPage === totalPages && totalPages>1){
            return `
            <button data-goto="${curPage-1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icon}#icon-arrow-left"></use>
                </svg>
                <span>${curPage-1}</span>
            </button>`
        }
        //1 page only
        return '';
    }
    addHandlerClick(handler){
        this._parentEl.addEventListener(`click`,function(e){
            const target = e.target.closest('.btn--inline');
            if(!target) return
            const goto = target.dataset.goto;
            handler(+goto)
        })
    }
}

export const paginationView = new PaginationView();