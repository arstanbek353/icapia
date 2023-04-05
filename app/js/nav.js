
export default function modal() {
  class Nav {
    constructor() {
      this.body = document.querySelector(`body`)
      this.root = document.querySelector(`.root`)
      this.header = document.querySelector(`.header`)
      this.headerInner = document.querySelector(`.header__inner`)
      this.headerControlls = document.querySelector(`.header__controlls`)
      this.navNode = document.querySelector(`.header__nav`)
      this.burgerNode = document.querySelector('.header__burger')
      this.init()
    }
    init() {
      if (this.navNode && this.burgerNode) {
        const breakpoint = window.matchMedia('(max-width: 48em)');
        if (breakpoint.matches) {
          this.root.insertBefore(this.navNode, this.header)
        }
        breakpoint.addEventListener("change", (e) => {
          console.log(e)
          if (e.matches) {
            this.root.insertBefore(this.navNode, this.header)
          } else {
            this.headerInner.insertBefore(this.navNode, this.headerControlls)
          }
        });
        this.toggleHendler()
      }
    }
    open() {
      window.search.close()
      this.navNode ? this.navNode.classList.add('active') : null;
      this.burgerNode ? this.burgerNode.classList.add('active') : null;
      this.body ? this.body.classList.add('o-hidden') : null;
    }
    close() {
      this.navNode ? this.navNode.classList.remove('active') : null;
      this.burgerNode ? this.burgerNode.classList.remove('active') : null;
      this.body ? this.body.classList.remove('o-hidden') : null;
    }
    toggleHendler() {
      this.burgerNode.addEventListener('click', (e) => {
        e.preventDefault()
        if (this.burgerNode.classList.contains('active')) {
          this.close()
        } else {
          this.open()
        }
      })
    }
  }

  const nav = new Nav();
  window.nav = nav
}