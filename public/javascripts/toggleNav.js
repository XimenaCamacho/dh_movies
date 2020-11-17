const toogle_button = document.getElementsByClassName ('toggle_nav') [0];
const navbar_links = document.getElementsByClassName ('navigation_bar')[0];

toogle_button.addEventListener ('click', ()=>{
    navbar_links.classList.toggle ('active')
});