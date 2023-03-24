export default function modal() {
  class Modal {
    constructor(name) {
        this.name = name;
        this.modal = document.querySelector(`[data-modal="${name}"]`)
        this.body = document.querySelector(`body`)
        this.triggers = document.querySelectorAll(`[data-class="${name}"]`)
        this.openHendler()
        this.closeHendler()
    }
    open() {
      window.lastZIndexModal = window.lastZIndexModal ? window.lastZIndexModal + 1 : 150
      this.modal ? this.modal.style['z-index'] = window.lastZIndexModal : null;
      this.modal ? this.modal.classList.add('active') : null;
      this.body ? this.body.classList.add('o-hidden') : null;
    }
    close() {
      this.modal ? this.modal.style['z-index'] = -150 : null;
      this.modal ? this.modal.classList.remove('active') : null;
      this.body ?  this.body.classList.remove('o-hidden') : null;
    }
    update() {
        this.modal = document.querySelector(`[data-modal="${this.name}"]`)
        this.triggers = document.querySelectorAll(`[data-class="${this.name}"]`)
        this.openHendler()
    }
    openHendler() {
        this.triggers.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault()
                this.open()
            })
        })
    }
    closeHendler() {
        this.modal ? this.modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('close-x')) {
                this.close()
            }
        }) : null;
    }
  }

  const modalCartadded = new Modal('cart-added');
  window.modalCartadded = modalCartadded

  const modalApplicatioAccepted = new Modal('applicatio-accepted');
  window.modalApplicatioAccepted = modalApplicatioAccepted

  const modalReviewAccepted = new Modal('review-accepted');
  window.modalReviewAccepted = modalReviewAccepted

  const modalReview = new Modal('review');
  window.modalReview = modalReview

  const modalContact = new Modal('contact');
  window.modalContact = modalContact
}