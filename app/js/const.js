export const baseUrl = 'http://example.com' // базовый url
export const apiUrls = {
  addCartItem: baseUrl + '/addCartItem', // добавить товар в корзину
  updateCartItem: baseUrl + '/updateCartItem', // !!< не реализрвано доконца >!! обновить товар в корзине
  removeCartItem: baseUrl + '/removeCartItem', // удалить товар из корзины
  orderCart: baseUrl + '/orderCart', // оформить корзину
  getProducts: baseUrl + '/getProducts', // получить товары по фильтру
  contact: baseUrl + '/contact', // запрос "связатся с нами"
  review: baseUrl + '/review', // оставить отзыв
  search: baseUrl + '/search', // запрос на поиск товаров
}

export const formDataToObject = function(formData) {
  const isFormData = formData instanceof FormData
  if (!isFormData) return formData
  const object = {}
  formData.forEach((value, key) => {
    if (!Reflect.has(object, key)) {
      object[key] = value
      return
    }
    if (!Array.isArray(object[key])) {
      object[key] = [object[key]]
    }
    object[key].push(value)
  })
  return object
}