import View from "./view";
import icon from 'url:../../img/icons.svg';
class AddRecipeView extends View{
    _parentEl = document.querySelector('.upload');
    orginalMarkup = this._parentEl.innerHTML;
    _message = 'Your Recipe uploaded successfully 👌'
    overlay = document.querySelector('.overlay');
    btnAdd = document.querySelector('.nav__btn--add-recipe')
    btnClose = document.querySelector('.btn--close-modal')
    formWindow = document.querySelector('.add-recipe-window')
    constructor(){
        super();
        this.addHandlerShowWindow();
        this.addHandlerRemoveWindow();
    }
    toggleWindow(){
        this.overlay.classList.toggle('hidden');
        this.formWindow.classList.toggle('hidden');
    }
    addHandlerShowWindow(){
        this.btnAdd.addEventListener('click',function(){
            //to revert the form markup after submitting the new Recipe
            this._parentEl.innerHTML = this.orginalMarkup;
            this.toggleWindow();
        }.bind(this))
    }
    addHandlerRemoveWindow(){
        this.btnClose.addEventListener('click',this.toggleWindow.bind(this))
        this.overlay.addEventListener('click',this.toggleWindow.bind(this))
    }
    addHandlerUpload(handler){
        this._parentEl.addEventListener('submit',function(e){
            e.preventDefault();
            const newRecipeEntries = [...new FormData(this)]
            const data = Object.fromEntries(newRecipeEntries);
            handler(data);
        })
    }
}

export const addRecipeView = new AddRecipeView();