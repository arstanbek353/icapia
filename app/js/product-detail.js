export default function () {
  const sectionNodes = document.querySelectorAll('.product-detail')
  sectionNodes.forEach(element => {
    const sliderNode = element.querySelector('.product-detail__slider')
    const prevNode = element.querySelector('.product-detail__prev')
    const nextNode = element.querySelector('.product-detail__next')
    var swiper = new Swiper(sliderNode, {
      slidesPerView: 1,
      loop: true,
      loopedSlides: 4,
      navigation: {
        nextEl: nextNode,
        prevEl: prevNode,
        disabledClass: 'disabled',
      },
    });
  })

  const tabNodes = document.querySelectorAll('.product-tab')

  tabNodes.forEach((element, index) => {
    const tabsNodes = element.querySelectorAll('.product-tab__tab')
    const blocksNodes = element.querySelectorAll('.product-tab__block')
    
    tabsNodes.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        tabsNodes.forEach(i => i.classList.remove('active'))
        blocksNodes.forEach(i => i.classList.remove('active'))
        tab.classList.add('active')
        blocksNodes[index].classList.add('active')
      })
    })
  })
}