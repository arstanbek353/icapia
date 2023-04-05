import {apiUrls, formDataToObject} from './const.js'

class CartItem {
  constructor(element) {
    this.element = element;
    this.id = element.getAttribute('id');
    this.checkedNodeInput = element.querySelector('.cart-list__check-input')
    this.removeNodeButton = element.querySelector('.cart-list__remove-btn')
    this.quantityNodeInput = element.querySelector('.cart-list__counter-input')
    this.price = element.querySelector('.cart-list__price .price').textContent
    this.currency = element.querySelector('.cart-list__price .currency').textContent

    this.checked = this.checkedNodeInput.checked
    this.quantity = +this.quantityNodeInput.value

    this.checkedHendler()
    this.quantityHendler()
    this.removeHendler()
  }
  remove() {
    this.element.classList.add('hide')
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.element.remove()
        resolve();
      }, 500)
    });
  }
  checkedHendler() {
    this.checkedNodeInput.addEventListener('change', (e) => {
      e.preventDefault()
      this.checked = e.target.checked
      e.target.dispatchEvent(
        new CustomEvent("cartChecked", {
          bubbles: true,
        })
      );
    })
  }
  quantityHendler() {
    this.quantityNodeInput.addEventListener('change', (e) => {
      e.preventDefault()
      this.quantity = +e.target.value
      e.target.dispatchEvent(
        new CustomEvent("cartQuantityUpdate", {
          bubbles: true,
        })
      );
    })
  }
  removeHendler() {
    this.removeNodeButton.addEventListener('click', (e) => {
      e.preventDefault()
      e.target.dispatchEvent(
        new CustomEvent("cartRemove", {
          bubbles: true,
        })
      );
    })
  }
}

class CartTotal {
  constructor(element) {
    this.element = element;
    this.priceNode = element.querySelector('.cart-aside__v--price')
    this.quantityNode = element.querySelector('.cart-aside__v--quantity')
    this.orderNodeButton = element.querySelector('.cart-aside__btn')

    this.currency = '';

    this.totalQuantity = 0;
    this.totalPrice = 0;

    this.data = {}
  }
  updateState(cartItemInstances = []) {
    this.totalQuantity = 0
    this.totalPrice = 0
    this.data = {}
    cartItemInstances.forEach((cartItemInstance, index) => {
      if (index === 0) {
        this.currency = cartItemInstance.currency
      }
      if (cartItemInstance.checked) {
        this.data[cartItemInstance.id] = cartItemInstance.quantity
        this.totalQuantity++
        this.totalPrice = this.totalPrice + (cartItemInstance.quantity * cartItemInstance.price)
      }
    })
    this.priceNode.textContent = this.totalPrice ? this.currency + this.totalPrice : 0
    this.quantityNode.textContent = this.totalQuantity
    this.disableOrderNodeButton(!!this.totalQuantity)
  }
  disableOrderNodeButton(bool) {
    if (bool) {
      this.orderNodeButton.removeAttribute('disabled')
    } else {
      this.orderNodeButton.setAttribute('disabled', true)
    }
  }
  clearState(cartItemInstances = []) {
    this.totalQuantity = 0
    this.totalPrice = 0
    this.data = {}
    cartItemInstances.forEach((cartItemInstance, index) => {
      if (cartItemInstance.checked) {
        cartItemInstance.remove()
      }
    })
    this.priceNode.textContent = 0
    this.quantityNode.textContent = 0
    this.disableOrderNodeButton(!!this.totalQuantity)
  }
}

const ApiAddItem = (data) => {
  return fetch(apiUrls.addCartItem, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

const ApiRemoveItem = (data) => {
  return fetch(apiUrls.removeCartItem, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

const ApiOrderCart = (data) => {
  return fetch(apiUrls.orderCart, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

const ApiUpdateItem = (data) => {
  return fetch(apiUrls.updateCartItem, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export default function () {
  document.addEventListener('click', (e) => {
    const target = e.target
    const id = target.dataset.itemId
    if (id) {
      const text = target.textContent
      target.setAttribute('disabled', true)
      target.textContent = 'Loading...'
      ApiAddItem({id}).then(() => {
        target.textContent = 'Item in cart'
        window.modalCartAdded.open()
      }).catch(() => {
        alert('Error')
        target.textContent = text
        target.removeAttribute('disabled')
      })
    }
  })


  const cartList = document.querySelector('.cart-list')
  const cartAside = document.querySelector('.cart-aside')
  const orderButton = document.querySelector('.js-order')
  const orderForm = document.querySelector('.js-form-order')
  if (!cartList || !cartAside) {
    return
  }

  const cartItemsNodes = cartList.querySelectorAll('.cart-list__item')

  const cartItemInstances = []
  window.cartItemInstances = cartItemInstances
  const cartTotal = new CartTotal(cartAside)
  window.cartTotal = cartTotal

  cartItemsNodes.forEach((element) => {
    const cartItem = new CartItem(element)
    cartItemInstances.push(cartItem)
    element.addEventListener('cartChecked', (e) => {
      cartTotal.updateState(cartItemInstances)
    })
    element.addEventListener('cartQuantityUpdate', (e) => {
      cartTotal.updateState(cartItemInstances)
      // cartTotal.disableOrderNodeButton(false)
      // ApiUpdateItem({
      //   id: cartItem.id,
      //   quantity: cartItem.quantity,
      // }).then(() => {
      //   cartTotal.updateState(cartItemInstances)
      // }).catch(e => {
      //   cartTotal.updateState(cartItemInstances)
      // })
    })
    element.addEventListener('cartRemove', (e) => {
      cartTotal.disableOrderNodeButton(false)
      ApiRemoveItem({ id: cartItem.id }).then(() => {
        cartItem.remove().then(() => {
          const indexOfCart = cartItemInstances.findIndex(i => i.id === cartItem.id)
          cartItemInstances.splice(indexOfCart, 1)
          cartTotal.updateState(cartItemInstances)
        })
      }).catch(e => {
        cartTotal.updateState(cartItemInstances)
      })
    })
  })

  cartTotal.orderNodeButton.addEventListener('click', () => {
    window.modalOrder.open()
  })

  orderForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const data = formDataToObject(new FormData(orderForm))
    console.log(data)
    data.cart = cartTotal.data

    const btnText = orderButton.textContent
    cartTotal.disableOrderNodeButton(false)
    orderButton.setAttribute('disabled', true)
    orderButton.textContent = 'Loading...'
    ApiOrderCart(data).then(() => {
      console.log('orderCart success')
      const promises = cartItemInstances.map(cartItem => {
        if (cartItem.checked) {
          return cartItem.remove().then(() => {
            const indexOfCart = cartItemInstances.findIndex(i => i.id === cartItem.id)
            cartItemInstances.splice(indexOfCart, 1)
            return Promise.resolve()
          })
        } else {
          return Promise.resolve()
        }
      })
      console.log('promises', promises)
      Promise.all(promises).then((values) => {
        console.log('values', values)
        cartTotal.updateState(cartItemInstances)
      })
      window.modalApplicatioAccepted.open()
    }).catch(() => {
      alert('cart error')
    }).finally(() => {
      orderButton.textContent = btnText
      orderButton.removeAttribute('disabled')
      cartTotal.updateState(cartItemInstances)
    })
  })

}