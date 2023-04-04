
import {baseUrl} from './const.js'

const apiUrls = {
  contact: baseUrl + '/contact',
}

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

export default function () {
  const forms = document.querySelectorAll('.js-contact-form')
  forms.forEach(form => {
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
}