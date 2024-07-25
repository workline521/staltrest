/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'restyle.css'
import 'restyle.css/dist/checkboxes.css'
import 'src/styles/main.scss'
import 'src/components'
import Swiper from 'swiper/bundle';
const swiper = new Swiper('.info__slider', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true, 
  },
}) 

const swiperThumbs = new Swiper('.cert__thumbs', {
  loop: true,
  spaceBetween: 4,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
})
const swiperMain = new Swiper('.cert__swiper', {
  loop: true,
  slidesPerView: 1,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  thumbs: { swiper: swiperThumbs, },
}) 
