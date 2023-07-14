const buttons = document.querySelectorAll("[data-carousel-button]")

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]")

    const activeSlide = slides.querySelector("[data-active]")
    let newIndex = [...slides.children].indexOf(activeSlide) + offset
    if (newIndex < 0) newIndex = slides.children.length - 1
    if (newIndex >= slides.children.length) newIndex = 0

    slides.children[newIndex].dataset.active = true
    delete activeSlide.dataset.active
  })
})



const element = document.getElementById("notif");

function scrollToTop() {
  element.scrollIntoView(true);
}

function scrolltoId(){
  var access = document.getElementById("linkcarousel");
  window.scrollTo({
  top: access.scrollTop,
  left: access.scrollLeft});
  }
// const ele = document.getElementById("linkcarousel");

// function scrollToId() {
//   ele.scrollIntoView(true);
// }
// $('#notices').click(function(){

//   $(html, body).animate({

// scrollTop:$("#notif").offset().top

//   }, 2000);


// })


