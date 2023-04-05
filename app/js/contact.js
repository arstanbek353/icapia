
import {apiUrls} from './const.js'

const ApiContact = (data) => {
  console.log(apiUrls)
  return fetch(apiUrls.contact, {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

const ApiReview = (data) => {
  console.log(apiUrls)
  return fetch(apiUrls.review, {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'multipart/form-data'
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
      ApiContact(formData).then(() => {
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
      ApiReview(formData).then(() => {
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