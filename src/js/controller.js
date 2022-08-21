import * as model from './model.js';
import { recipeView } from './view/recipeView.js';
import { searchView } from './view/searchView.js';
import { resultView } from './view/resultView.js';
import { paginationView } from './view/paginationView.js';
import { bookmarkView } from './view/bookmarkView.js';
import { addRecipeView } from './view/addRecipeView.js';
import { MODAl_CLOSE_SEC } from './config.js';


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function(){
  try {
    const id = window.location.hash.slice(1);
    if(!id)return;
    recipeView.loadSpinner();
    // loading data
    await model.loadRecipe(id)
    // rendering data
    recipeView.render(model.state.recipe)
    resultView.update(model.loadSearchResultPage())
    bookmarkView.update(model.state.bookmarks)
    // bookmarkView.render(model.state.bookmarks)
  } catch (error) {
    recipeView.errorHandler(error) 
  }
};

const controlSearch = async function(){
  try {
    resultView.loadSpinner();
    // 1- getting query
    const query = await searchView.getQuery();
    if(!query) return resultView.errorHandler()
    // 2- fetching results
    await model.loadSearchResults(query)
    // if(model.state.search.results.length === 0) throw Error('nothing found');
    // 3- rendering results
    // resultView.render()
    // resultView.render(model.state.search.results)
    resultView.render(model.loadSearchResultPage())
    // resultView.update(model.loadSearchResultPage())
    paginationView.render(model.state.search)
        
        
      } catch (error) {
        console.log(error);
        resultView.errorHandler(error)
      }
}

const controlPagination = function(goto){
  resultView.render(model.loadSearchResultPage(goto))
  paginationView.render(model.state.search)
}

const controlServings = function(newServingCount){
  model.upadateServings(newServingCount);
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
}

const controlAddBookmark = function(){
  // 1 - add/remove bookmark
  if(!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // 2 - update recipe to adapt the change in bookmark button
  recipeView.update(model.state.recipe);
  // 3 - render bookmark view
  bookmarkView.render(model.state.bookmarks)
}

const controlBookmarks = function(){
  bookmarkView.render(model.state.bookmarks)
}

const controlAddRecipe = async function(newRecipe){
  try {
    addRecipeView.loadSpinner()
    //upload new recipe
    await model.uploadRecipe(newRecipe);
    //render new recipe
    recipeView.render(model.state.recipe)
    addRecipeView.renderMessage();
    setTimeout(() => {
      //close the form window
      addRecipeView.toggleWindow();
    },MODAl_CLOSE_SEC*1000);
    //rendering on bookmark view
    bookmarkView.render(model.state.bookmarks);
    //change url
    window.history.pushState(null,'',`#${model.state.recipe.id}`)
    
  } catch (error) {
    console.log(error);
    addRecipeView.errorHandler(error.message);    
  }
}

const init = function(){
  bookmarkView.addHandlerRender(controlBookmarks)
  addRecipeView.addHandlerUpload(controlAddRecipe);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerClick(controlPagination);
};
init();


// const test = new Promise((res,rej)=>{
//   res()
// });
// test
//   .then(()=>recipeView.addHandlerRender(controlRecipe))
//   .then(()=>searchView.addHandlerSearch(controlSearch))
//   .then(()=>paginationView.addHandlerClick(controlPagination))
//   .then((
// setTimeout(() => {
//   // controlServings(10)
// }, 1000*7);

// // {
  //   "publisher": "My Baking Addiction",
  //   "ingredients": [
    //       {
//           "quantity": 1,
//           "unit": "",
//           "description": "tbsp. canola or olive oil"
//       },
//       {
//           "quantity": 0.5,
//           "unit": "cup",
//           "description": "chopped sweet onion"
//       },
//       {
//           "quantity": 3,
//           "unit": "cups",
//           "description": "diced fresh red yellow and green bell peppers"
//       },
//       {
  //           "quantity": 1,
  //           "unit": "",
//           "description": "tube refrigerated pizza dough"
//       },
//       {
  //           "quantity": 0.5,
  //           "unit": "cup",
  //           "description": "salsa"
//       },
//       {
//           "quantity": 2,
//           "unit": "cups",
//           "description": "sargento chefstyle shredded pepper jack cheese"
//       },
//       {
//           "quantity": null,
//           "unit": "",
//           "description": "Chopped cilantro or dried oregano"
//       }
//   ],
//   "source_url": "http://www.mybakingaddiction.com/spicy-chicken-and-pepper-jack-pizza-recipe/",
//   "image_url": "http://forkify-api.herokuapp.com/images/FlatBread21of1a180.jpg",
//   "title": "Spicy Chicken and Pepper Jack Pizza",
//   "servings": 4,
//   "cooking_time": 45,
//   "id": "5ed6604591c37cdc054bc886"
// }



// const showAll = async function(){
//   const res = await fetch('http://192.168.0.1/goform/getQos??random=0.13835233362514554%26modules%3Dlocalhost%2ConlineList%2CmacFilter%2CguestList%2CwifiBasicCfg%2CwifiRelay%2CwifiGuest');
//   const data = await res.json();
//   console.log(data);
// }
// showAll();

        // const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza');

        // 8219469142