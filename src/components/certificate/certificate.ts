/* eslint-disable @typescript-eslint/no-unused-vars */
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
