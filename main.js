const menuBtn = document.querySelector("#menuBtn")
const mobileMenu = document.querySelector("#mobileMenu")
const closeBtn = document.querySelector("#closeBtn")
const overlay = document.querySelector("#overlay");

menuBtn.addEventListener("click",
    function () {
        mobileMenu.classList.toggle("active");
        overlay.classList.toggle("active");
    }
)

closeBtn.addEventListener("click",
    function () {
        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");
    }
)



