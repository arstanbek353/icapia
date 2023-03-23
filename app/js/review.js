export default function () {
  const sectionNodes = document.querySelectorAll('.review-slider')
  sectionNodes.forEach(element => {
    const sliderNode = element.querySelector('.review-slider__slider')
    const prevNode = element.querySelector('.review-slider__prev')
    const nextNode = element.querySelector('.review-slider__next')
    var swiper = new Swiper(sliderNode, {
      slidesPerView: 'auto',
      loop: true,
      loopedSlides: 4,
      navigation: {
        nextEl: nextNode,
        prevEl: prevNode,
        disabledClass: 'disabled',
      },
    });
  })
}