const tombolbuka = document.getElementById('tombolbuka');
const tomboltutup = document.getElementById('tomboltutup');
const modaloverlay = document.getElementById('modaloverlay');

tombolbuka.addEventListener("cliclk",()=> {
    modaloverlay.classList.add("popup-tampil");
})

tomboltutup.addEventListener("click",()=> {
    modaloverlay.classList.remove("popup-tampil");
})

modaloverlay.addEventListener("click",(e)=> {
    if(e.target == modaloverlay){
        modaloverlay.classList.remove("popup-tampil");
    }
});
