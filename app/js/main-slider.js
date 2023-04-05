export default function () {
  const sectionNodes = document.querySelectorAll('.main-slider')
  sectionNodes.forEach(element => {
    const sliderNode = element.querySelector('.main-slider__slider')
    const pagNode = element.querySelector('.main-slider__pag')
    const prevNode = element.querySelector('.main-slider__prev')
    const nextNode = element.querySelector('.main-slider__next')
    const delay = 3000
    const intervalUpdateProgress = 10
    var swiper = new Swiper(sliderNode, {
      slidesPerView: 1,
      loop: true,
      effect: 'fade',
      loopedSlides: 4,
      autoplay: {
        delay: delay,
      },
      pagination: {
        el: pagNode,
        // type: 'custom',
        // bulletClass: 'bullet',
        // bulletActiveClass: 'active',
        renderBullet: function (index, className) {
          return `<span class="${className}"><span class="line"></span></span>`;
        },
      },
      navigation: {
        nextEl: nextNode,
        prevEl: prevNode,
        disabledClass: 'disabled',
      },
    });
  
    function updatedProgressBullet() {

      const currentBullet = pagNode.querySelector('.swiper-pagination-bullet-active')
      const currentBulletLine = currentBullet.querySelector('.line')
      let p = 0
      let part = (intervalUpdateProgress * 100) / delay
      setWidthBullet()
      const intervalID =  setInterval(setWidthBullet, intervalUpdateProgress)
      function setWidthBullet() {
        p = p + part
        currentBulletLine.style.width = `${p}%`

        if (p >= 100) {
          p = 0
          clearInterval(intervalID)
        }
      }
      return intervalID
    }

    let inter = updatedProgressBullet()

    swiper.on('slideChange', function (e) {
      clearInterval(inter)
      const bulletLines = pagNode.querySelectorAll('.swiper-pagination-bullet .line')
      bulletLines.forEach(element => {
        element.removeAttribute('style')
      });
      inter = updatedProgressBullet()
    });
    
    function updateNavText() {
      const prevText = element.querySelector('.swiper-slide-prev .main-slider__name').textContent
      const nextText = element.querySelector('.swiper-slide-next .main-slider__name').textContent
      prevNode.textContent = prevText
      nextNode.textContent = nextText
    }
    updateNavText()

    swiper.on('slideChangeTransitionEnd', function (e) {
      updateNavText()
    });
  })
}