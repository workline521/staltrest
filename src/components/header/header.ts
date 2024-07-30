/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

/* popup */
const popup = document.querySelector('.popup')
const popupOverlay = document.querySelector('.popup__overlay')
const popupBtns = document.querySelectorAll('.header__call')
const closePopup = popup.querySelector('.popup__close')

closePopup.addEventListener('click', () => {
  popup.classList.remove('active')
  popupOverlay.classList.remove('active')
})
popupOverlay.addEventListener('click', () => {
  popup.classList.remove('active')
  popupOverlay.classList.remove('active')
})
function showPopup(){
  popup.classList.add('active')
  popupOverlay.classList.add('active')
}
popupBtns.forEach(n => n.addEventListener('click', showPopup))

/* mobile menu */

const body = document.querySelector('body')
const burger = document.querySelector('.header__burger')

burger.addEventListener('click', () => {
  body.classList.toggle('show')
  burger.classList.toggle('show')
})
