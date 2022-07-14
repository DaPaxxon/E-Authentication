
const menuList=document.querySelectorAll(".menuList") 
const navRightArrows=document.querySelectorAll(".navRightArrow") 
const navDownArrows = document.querySelectorAll(".navDownArrow");



for (let i = 0; i < navRightArrows.length; i++){
    navRightArrows[i].addEventListener("click", () => {
        navRightArrows[i].style.display = "none";
        navDownArrows[i].style.display = "flex";
        menuList[i].style.display = "flex";

    });
    navDownArrows[i].addEventListener("click", () => {
        navDownArrows[i].style.display = "none";
        menuList[i].style.display = "none";
        navRightArrows[i].style.display = "flex";
    });
}



//for closing and opening
let menuOpen = false;

const theMenu = document.querySelector("#menu");
const hamburger = document.querySelector("#hamburger");

hamburger.addEventListener("click", () => {
    menuOpen = !menuOpen
    if(menuOpen===true){
        theMenu.style.display="block"
    } else {
        theMenu.style.display="none"
    }
})





