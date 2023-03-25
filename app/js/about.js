export default function () {
  const tabNodes = document.querySelectorAll('.about-tab')

  tabNodes.forEach((element, index) => {
    const tabsNodes = element.querySelectorAll('.about-tab__tab')
    const blocksNodes = element.querySelectorAll('.about-tab__block')
    const imagesNodes = element.querySelectorAll('.about-tab__img')
    
    tabsNodes.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        tabsNodes.forEach(i => i.classList.remove('active'))
        blocksNodes.forEach(i => i.classList.remove('active'))
        imagesNodes.forEach(i => i.classList.remove('active'))
        tab.classList.add('active')
        blocksNodes[index].classList.add('active')
        imagesNodes[index].classList.add('active')
      })
    })
  })
}