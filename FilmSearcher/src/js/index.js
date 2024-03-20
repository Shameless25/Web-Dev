//MAIN CONTROLLER
import Search from "./models/Search";
import Movie from "./models/Movie";
import Cart from "./models/Cart";
import Like from "./models/Like";
import * as searchMovieView from "./views/searchMovieView";
import { classNames, loader, stopLoader } from "./includes/classSelector";
import * as movieView from "./views/movieView";
import * as cartView from "./views/cartView";
import * as likeView from "./views/likeView";
/* 
    GLOBAL APPLICATION STATE
    1. SEARCH OBJ
    2. MOVIE OBJ
    3. CART OBJ
    4. LIKE OBJ
*/

const data = {

};

//SEARCH CONTROLER
const searchControler = async () =>{
    //GET SEARCH QUERY FROM THE FORM
    // const query = "Tarzan";
    const query = searchMovieView.getFormInput();
    if(query){
        //CREATE NEW OBJ FROM SEARCH CLASS
        // const search = new Search(query);
        // data.search = search;
        data.search = new Search(query);
        
        //CLEAR INPUT SEARCH
        searchMovieView.resetInput();
        //CLEAR MOVIE SLIDER
        searchMovieView.resetMovieSlider();

        //LOADER
        loader(classNames.parentElement);

        try{
            //MOVIE SEARCH
            await data.search.getSearchResult();
            //STOP LOADER
            stopLoader();
            //DISPLAY THE DATA TO UI
            // console.log(data.search.movies);
            searchMovieView.displayResults(data.search.movies);
        }catch(error){
            alert("Error while searching the movie");
        }
    }
};

//MOVIE CONTROLLER

const movieController = async () =>{
    const id = window.location.hash.replace('#','');
    // console.log(id);
    if(id){
        //CREATE NEW MOVIE OBJ
        data.movie = new Movie(id);
        //LOADER
        loader(classNames.parentElement);
       try{
            //GET MOVIE DATA
            await data.movie.getMovie();
            //STOP LOADER
            stopLoader();
            //RESET THE MAIN CONTENT
            movieView.resetMain();
            //DISPLAY THE MOVIE
            movieView.displayMovie(data.movie, data.like.checkLikedMovieStatus(id));
            //DISPLAY DESCRIPTIOM
            movieDescription();
            // console.log(data.movie);
       }catch(error){
            alert("Fetching the movie from id problem");
       }
    }
};
//MOVIE DESCRIPTION TABS
const movieDescription = () =>{
    const tabs = document.querySelectorAll('[data-tab-target]');
    const tabContent = document.querySelectorAll('[data-tab-content]');
    tabs.forEach(el =>{
        el.addEventListener("click",()=>{
            const target = document.querySelector(el.dataset.tabTarget);
            tabContent.forEach(el=>{
                el.classList.remove('activeTab');
            });
            tabs.forEach(tab=>{
                tab.classList.remove('activeTab');
            });
            el.classList.add('activeTab')
            target.classList.add('activeTab')
        })
    })
};
function hashHandler(){
    if(location.hash != '#target-content' && location.hash !='#target-content1' && location.hash !='#'){
        movieController();
    }
};
// window.addEventListener('hashchange',movieController);
window.addEventListener('hashchange',hashHandler);
window.addEventListener('load',movieController);

//CART CONTROLLER
const cartController = () =>{
    //CREAT NEW CART AND CHECK IF OTHER EXISTING
    if(!data.cart) data.cart = new Cart();
    //ADD MOVIE DETAILS 
    const movieItem = data.cart.addIteam(data.movie.numTickets,data.movie.title,data.movie.price,data.movie.poster);
    //DISPLAY THE MOVIE ITEM
    cartView.dispalyMovieIteam(movieItem);
    //DISPLAY THE CART NUMBER
    const cartNumber = data.cart.showList();
    cartView.dispalyCartNumber(cartNumber.length);
};

//LIKE CONTROLLER
const likeController = () =>{
    
    if(!data.like) data.like = new Like();
    const likedId = data.movie.imdbID;
    if(!data.like.checkLikedMovieStatus(likedId)){
        data.like.addLikedMovie(data.movie.imdbID,data.movie.poster,data.movie.title,data.movie.year,data.movie.imdbRating);
        
        //RESET LIKE ON MODEL
        likeView.resetLikeModel();
        //DISPLAY LIKE ON MODEL
        likeView.displayLikeNumber(data.like.numberOfLikes());
        const likes = data.like.showLikes();
        likes.forEach(el =>{
            likeView.displayLikeModel(el);
        })
        //CHECKING STATUS OF LIKE BTN
        const checkIsLiked = data.like.checkLikedMovieStatus(data.like.id);
        likeView.displayLike(!checkIsLiked);
    }
    else{
        data.like.deleteLikedMovie(likedId);
        likeView.displayLikeNumber(data.like.numberOfLikes());
        //CHECKING STATUS OF LIKE BTN
        const checkIsLiked = data.like.checkLikedMovieStatus(data.like.id);
        likeView.displayLike(checkIsLiked);
        //RESET LIKE ON MODEL
        likeView.resetLikeModel();
        //DISPLAY LIKE ON MODEL
        likeView.displayLikeNumber(data.like.numberOfLikes());
        const likes = data.like.showLikes();
        likes.forEach(el =>{
            likeView.displayLikeModel(el);
        })
    }
}


//BROWSER REFRESH
window.addEventListener('load', ()=>{
    window.data = data;
    data.like = new Like();
    data.cart = new Cart();


    data.like.restoreDataLocalStorage();
    //DISPLAY THE LIKES FROM OUR STORAGE
    const likes = data.like.showLikes();
    likes.forEach(el=>{
        likeView.displayLikeModel(el);
    });
    //LIKE NUMBER
    likeView.displayLikeNumber(data.like.numberOfLikes());
    
    //DISPLAY CART FROM LOCAL STORAGE
    data.cart.restoreDataLocalStorage();
    const movies = data.cart.showList();
    movies.forEach(el=>{
        cartView.dispalyMovieIteam(el);
    });
    //CART NUMBER
    const cartNumber = data.cart.showList();
    cartView.dispalyCartNumber(cartNumber.length);
});

classNames.searchForm.addEventListener("submit", e=>{
    e.preventDefault();
    //CALL SEARCH CONTROLER
    searchControler();
});

//EVENT LISTENER ON MOVIE SLIDER LEFT AND RIGHT ARROW BTN
classNames.movieSlider.addEventListener("click",e=>{
    const sliderBtn = e.target.closest('.arrow-btn');
    //NUMBER OF PAGES
    const pages = Math.ceil(data.search.movies.length / 4);
    if(sliderBtn){
        const pageNum = parseInt(sliderBtn.dataset.goto);
        if(pageNum !=0 && pageNum <= pages){
            searchMovieView.resetMovieSlider();
            searchMovieView.displayResults(data.search.movies,pageNum)
        }
    }  
});

//INCREASE OR DECRASE TICKET NUMBER, ADD TICKETS TO CART, LIKE MOVIE

classNames.mainContent.addEventListener('click', e=>{
    if(e.target.matches('.main-content__right-social--add, .main-content__right-social--add *')){
        data.movie.updateTickets('add');
        movieView.updtaeTicketNum(data.movie);
    }
    else if(e.target.matches('.main-content__right-social--minus, .main-content__right-social--minus *')){
        if(data.movie.numTickets>1){
            data.movie.updateTickets('minus');
            movieView.updtaeTicketNum(data.movie);
        };
    }
    else if(e.target.matches('.main-content__left--buy, .main-content__left--buy *')){
        cartController();
    }
    else if(e.target.matches('.main-content__right-social--likes, .main-content__right-social--likes *')){
        likeController();
    }
});

//DELETE AND UPDATE THE CART
classNames.cartContainer.addEventListener('click', e=>{
    const id = e.target.closest('.target-inner__list').dataset.deleteid;
    if(e.target.matches(".target-inner__list-delete, .target-inner__list-delete *")){
        //DELETE THE ITEM FROM DATA
        data.cart.deleteItem(id);
        //DELETE FORM UI
        cartView.deleteMovieItem(id);
        //UPDATE THE CART NUMBER
        const cartNumber = data.cart.showList();
        cartView.dispalyCartNumber(cartNumber.length);
    }
    else if(e.target.matches(".target-inner__list-tickets, .target-inner__list-tickets *")){
        const newTicketNumber = parseInt(e.target.value);
        if(newTicketNumber>1){
            data.cart.updateNumMovies(id, newTicketNumber);
            //UPDATE THE TICKET NUMBER FROM CART
            data.movie.updateFromCart(newTicketNumber);
            data.cart.calcPrice(data.movie.numTickets);
        }
    }
});