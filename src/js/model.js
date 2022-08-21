import { API_URL, KEY } from "./config";
import { AJAX } from "./helper";
import { PAGE_RES_COUNT } from "./config";
export const state = {
    recipe : {},
    search : {
        query : '',
        results : [],
        resultsPerPage : PAGE_RES_COUNT,
        page : 1,
    },
    bookmarks : []
};
const createFormatedRecipe = function(data){
    const {recipe} = data.data;
    return {
        id : recipe.id,
        publisher : recipe.publisher,
        img : recipe.image_url,
        title : recipe.title,
        sourceUrl : recipe.source_url,
        servings : recipe.servings,
        cookingTime : recipe.cooking_time,
        ingredients : recipe.ingredients,
        ...(recipe.key&&{key : recipe.key})
    }
}
export const loadRecipe = async function(id){
    try {
        const data = await AJAX(`${API_URL}${id}?key=${KEY}`)
        state.recipe = createFormatedRecipe(data);
        if(state.bookmarks.some(el=>el.id === id)) state.recipe.bookmarked = true;
        else state.recipe.bookmarked = false;
        // if(state.bookmarks.some(el=>el.id === id)) state.recipe.bookmarked = true;
    } catch (error) {
        throw 'Connection lost 🌐';
    }
};

export const loadSearchResults = async function(query){
    try {
        state.search.query = query;
        const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
        state.search.results = data.data.recipes.map(rec => {
            return {
                id : rec.id,
                publisher : rec.publisher,
                img : rec.image_url,
                title : rec.title,
                ...(rec.key&& {key:rec.key}),
            }
        })
        state.search.page = 1;
    } catch (err) {
        console.error(err+'🤔🤔');
        throw 'Connection lost 🌐'
    }
}

export const loadSearchResultPage = function(page = state.search.page){
    state.search.page = page;
    const start = (page-1)* state.search.resultsPerPage;
    const end =  page*state.search.resultsPerPage;
    return this.state.search.results.slice(start,end);
}

export const upadateServings = function(newServings){
    state.recipe.ingredients.forEach(ing=>ing.quantity = ing.quantity * newServings/state.recipe.servings);
    state.recipe.servings = newServings;
}

const storeBookmarks = function(){
    localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks))
  }

export const addBookMark = function(recipe){
    //add bookmarks
    state.bookmarks.push(recipe);
    //make current recipe as bookmarked
    if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;
    storeBookmarks();
}

export const deleteBookmark = function(id){
    const index = state.bookmarks.findIndex(bookmarks=> bookmarks.id === id)
    state.bookmarks.splice(index,1)
    state.recipe.bookmarked = false;
    storeBookmarks();
}

export const uploadRecipe = async function(newRecipe){
    try {
        //formate data according to api setup
        const ingredients = Object.entries(newRecipe)
        .filter(entry=>entry[0].startsWith('ingredient') && entry[1]!=='')
        .map(ing=>{
            const ingArr = ing[1].split(',').map(el=>el.trim());
            // const ingArr = ing[1].replaceAll(' ','').split(',');
            if(ingArr.length!== 3){
                throw new Error('👻 pls keep correct formate on entries')
            }
            [quantity,unit,description] = ingArr;
            return{quantity:quantity?+quantity:null,unit,description}
        })
        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients,
        }
        //upload data
        const data = await AJAX(`${API_URL}?key=${KEY}`,recipe);
        //reformating returned data to adapt to the app setup
        state.recipe = createFormatedRecipe(data);
        // add to bookmark
        addBookMark(state.recipe);
    } catch (error) {
        throw error        
    }
}

const init = function(){
    const storage = localStorage.getItem('bookmarks');
    if(storage) state.bookmarks = JSON.parse(storage);
}

init()