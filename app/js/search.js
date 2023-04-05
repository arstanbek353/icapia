import { apiUrls } from './const.js'
function debounce(f, ms) {
  console.log('debounce start')
  let isCooldown = false;

  return function() {
    if (isCooldown) return;

    f.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => isCooldown = false, ms);
  };

}
export default function modal() {
  class Search {
    constructor() {
      this.searchNode = document.querySelector('.search')
      this.openNode = document.querySelector('.search__open')
      this.inputNode = document.querySelector('.search__input')
      this.closeNode = document.querySelector('.search__close')
      this.innerNode = document.querySelector('.search__inner')
      this.dropNode = document.querySelector('.search__drop')
      this.listNode = document.querySelector('.search__list')
      this.root = document.querySelector(`.root`)
      this.header = document.querySelector(`.header`)
      this.body = document.querySelector(`body`)
      this.init()
      this.debounce = debounce(this.search, 300)
    }
    init() {
      if (this.openNode && this.inputNode && this.innerNode && this.dropNode) {
        const breakpoint = window.matchMedia('(max-width: 48em)');
        if (breakpoint.matches) {
          this.root.insertBefore(this.innerNode, this.header)
        }
        breakpoint.addEventListener("change", (e) => {
          console.log(e)
          if (e.matches) {
            this.root.insertBefore(this.innerNode, this.header)
          } else {
            this.searchNode.insertBefore(this.innerNode, this.openNode)
          }
        });
        this.openHendler()
        this.closeHendler()
        this.inputHandler()
      }
    }
    open() {
      window.nav.close()
      this.innerNode ? this.innerNode.classList.add('active') : null;
      this.openNode ? this.openNode.classList.add('active') : null;
      this.body ? this.body.classList.add('o-hidden') : null;
    }
    close() {
      this.innerNode ? this.innerNode.classList.remove('active') : null;
      this.openNode ? this.openNode.classList.remove('active') : null;
      this.dropNode ? this.dropNode.classList.remove('active') : null;
      this.body ? this.body.classList.remove('o-hidden') : null;
    }
    search(value) {
      this.dropNode.classList.add('loading', 'active')
      fetch(apiUrls.search + '?query=' + value, {
        method: 'GET',
      }).then((htmlData) => {
        this.listNode.innerHTML = htmlData
      }).finally(() => {
        this.dropNode.classList.remove('loading')
      })
    }
    openHendler() {
      this.openNode.addEventListener('click', (e) => {
        e.preventDefault()
        this.open()
      })
    }
    closeHendler() {
      this.closeNode.addEventListener('click', (e) => {
        e.preventDefault()
        this.close()
      })
      this.body.addEventListener('click', (e) => {
        if (!(e.target.closest('.search') || e.target.closest('.search__inner'))) {
          this.close()
        }
      })
    }
    inputHandler() {
      this.inputNode.addEventListener('input', (e) => {
        e.preventDefault()
        this.debounce(e.target.value)
      })
    }
  }

  const search = new Search();
  window.search = search
}