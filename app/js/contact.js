
import {apiUrls, formDataToObject} from './const.js'

const ApiContact = (data) => {
  console.log(apiUrls)
  return fetch(apiUrls.contact, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

const ApiReview = (data) => {
  console.log(apiUrls)
  return fetch(apiUrls.review, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export default function () {
  const contactForms = document.querySelectorAll('.js-contact-form')
  contactForms.forEach(form => {
    const button = form.querySelector('.js-contact-btn')
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const formData = new FormData(form)

      const btnText = button.textContent
      button.setAttribute('disabled', true)
      button.textContent = 'Loading...'
      ApiContact(formDataToObject(formData)).then(() => {
        console.log('contact success')
        //window.modalApplicatioAccepted.open()
      }).catch(() => {
        alert('contact error')
      }).finally(() => {
        button.textContent = btnText
        button.removeAttribute('disabled')
      })
    })
  })

  const reviewForms = document.querySelectorAll('.js-review-form')
  reviewForms.forEach(form => {
    const button = form.querySelector('.js-review-btn')
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const formData = new FormData(form)

      const btnText = button.textContent
      button.setAttribute('disabled', true)
      button.textContent = 'Loading...'
      ApiReview(formDataToObject(formData)).then(() => {
        console.log('review success')
        window.modalApplicatioAccepted.open()
      }).catch(() => {
        alert('review error')
      }).finally(() => {
        button.textContent = btnText
        button.removeAttribute('disabled')
      })
    })
  })
}