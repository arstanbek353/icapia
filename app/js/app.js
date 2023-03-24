// // Import vendor jQuery plugin example
// import $ from'~/app/js/jquery-3.6.4.min.js'
import mainSlider from '~/app/js/main-slider.js'
import mainProds from '~/app/js/main-prods.js'
import catalog from '~/app/js/catalog.js'
import productDetail from '~/app/js/product-detail.js'
import review from '~/app/js/review.js'
import modal from '~/app/js/modal.js'

document.addEventListener('DOMContentLoaded', () => {

  mainSlider()
  mainProds()
  catalog()
  productDetail()
  review()
  modal()

})
