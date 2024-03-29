export const classNames = {
    formInput: document.querySelector(".top-search__input"),
    searchForm: document.querySelector(".movie-search"),
    movieSlider: document.querySelector(".movie__slider"),
    parentElement: document.querySelector(".ht-header"),
    mainContent: document.querySelector(".main-content"),
    cartContainer: document.querySelector(".target-inner__container"),
    cartCircle: document.querySelector(".cart-circle"),
    likeContainer: document.querySelector(".likes__container"),
    likeCircle: document.querySelector(".likes-circle"),
};


export const loader = parent =>{
    const spin = `
    <div class="loader">
        <svg class="loader__icon">
            <use xlink:href="img/svg/icons.svg#icon-spin-alt"></use></svg>
        </svg>
    </div> -->`;
    parent.insertAdjacentHTML('afterbegin',spin);
}


//Stop Loader
export const stopLoader = ()=>{
    const isSpinning = document.querySelector(".loader");
    if(isSpinning){
        isSpinning.parentElement.removeChild(isSpinning);
    }
};