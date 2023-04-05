import { apiUrls } from './const.js'

export default function () {
  const wrapper = document.querySelector('.catalog-wrapper')
  const content = document.querySelector('.js-catalog-content')
  if (!wrapper) return
  const formHeadNode = document.querySelector('.catalog-head__sort')
  const formAsideNode = document.querySelector('.catalog-filter__content')
  const openNode = document.querySelector('.catalog-filter__open')
  const closeNode = document.querySelector('.catalog-filter__close')
  const resetNode = document.querySelector('.catalog-filter__reset')
  const applyNode = document.querySelector('.catalog-filter__apply')
  const rangeNodes = document.querySelectorAll('.catalog-filter__range')
  const paginationNode = document.querySelector('.pagination')
  const paginationNextNode = document.querySelector('.pagination__btn--next')
  const paginationPrevNode = document.querySelector('.pagination__btn--prev')
  const paginationNodes = document.querySelectorAll('.pagination__link')
  const rangeInstanceArray = []

  const ApiGetProducts = (query) => {
    wrapper.classList.add('loading')
    return fetch(apiUrls.getProducts + query, {
      method: 'GET',
    }).finally(() => {
      wrapper.classList.remove('loading')
    })
  }

  rangeNodes.forEach(element => {
    const inputRange = element.querySelector('.js-range-slider')
    const inputFrom = element.querySelector('.catalog-filter__range-input--from')
    const inputTo = element.querySelector('.catalog-filter__range-input--to')
    window.$(inputRange).ionRangeSlider({

      onChange: function (data) {
        inputFrom.value = data.from
        inputTo.value = data.to
      },
      onUpdate: function (data) {
        inputFrom.value = data.from
        inputTo.value = data.to
      }
    });

    // 2. Save instance to variable
    const rangeInstance = window.$(inputRange).data("ionRangeSlider");
    rangeInstanceArray.push(rangeInstance)

    inputFrom.addEventListener('blur', (e) => {
      const isValid = +e.target.value >= rangeInstance.options.min
      if (!isValid) {
        inputFrom.value = rangeInstance.options.min
      }
      rangeInstance.update({
        from: isValid ? +e.target.value : rangeInstance.options.min,
        to: inputTo.value
      });
    })

    inputTo.addEventListener('blur', (e) => {
      const isValid = +e.target.value <= rangeInstance.options.max
      if (!isValid) {
        inputTo.value = rangeInstance.options.max
      }
      rangeInstance.update({
        from: inputFrom.value,
        to: isValid ? +e.target.value : rangeInstance.options.max,
      });
    })
  })
  window.rangeInstanceArray = rangeInstanceArray

  resetNode.addEventListener('click', () => {
    setPag(1)
    formHeadNode.reset()
    formAsideNode.reset()
    rangeInstanceArray.forEach(instance => {
      instance.reset()
    })
    setURLFromForm()
    ApiGetProducts(location.search).then((htmlData) => {
      content.innerHTML = htmlData
    })
  })

  applyNode.addEventListener('click', () => {
    setPag(1)
    const formData = getConcatFormData()
    for (var pair of formData.entries()) {
      // console.log(pair[0] + ', ' + pair[1]);
    }
    setURLFromForm()
    ApiGetProducts(location.search).then((htmlData) => {
      content.innerHTML = htmlData
    })
  })

  openNode.addEventListener('click', () => {
    document.body.style.overflow = 'hidden'
    formAsideNode.classList.add('active')
  })

  closeNode.addEventListener('click', () => {
    document.body.style.overflow = 'visible'
    formAsideNode.classList.remove('active')
  })

  paginationNode.addEventListener('click', (e) => {
    setPag(e)
    ApiGetProducts(location.search).then((htmlData) => {
      content.innerHTML = htmlData
    })
  })

  function setURLFromForm() {
    const formData = getConcatFormData()
    const page = paginationNode.querySelector('.pagination__link.active').dataset.page
    formData.set('page', page)
    let form_str = new URLSearchParams(formData).toString();
    const refresh = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + form_str;
    window.history.pushState({ path: refresh }, '', refresh);
  }

  if (location.search) {
    setFormDataFromURL()
  } else {
    setURLFromForm()
  }

  function setFormDataFromURL() {
    let form_str = new URLSearchParams(location.search)
    for (const [key, value] of form_str.entries()) {
      const range = formAsideNode.querySelector(`input[name="${key}"]`)
      const checkbox = formHeadNode.querySelector(`input[name="${key}"][type="checkbox"]`) || formAsideNode.querySelector(`input[name="${key}"][type="checkbox"]`)
      const radioHead = formHeadNode.querySelectorAll(`input[name="${key}"][type="radio"]`)
      const radioAside = formAsideNode.querySelectorAll(`input[name="${key}"][type="radio"]`)
      const text = formHeadNode.querySelector(`input[name="${key}"][type="text"]`) || formAsideNode.querySelector(`input[name="${key}"][type="text"]`)
      if (checkbox) {
        checkbox.checked = true
      } else if (radioAside.length || radioHead.length) {
        radioAside.forEach(i => {
          i.checked = i.value === value
        })
        radioHead.forEach(i => {
          i.checked = i.value === value
        })
      } else if (range) {
        rangeInstanceArray.forEach(i => {
          if (i.input == range) {
            const arr = value.split('_')
            i.update({
              from: arr[0],
              to: arr[1],
            });
          }
        })
      } else if (text) {
        text.value = value
      }
    }
  }

  function getConcatFormData() {
    const arr = [
      new FormData(formHeadNode),
      new FormData(formAsideNode)
    ]
    const formData = arr[0]
    for (let i = 1; i < arr.length; i++) {
      for (var pair of arr[i].entries()) {
        formData.append(pair[0], pair[1]);
      }
    }
    return formData
  }

  function setPag(e, p) {
    e && e?.preventDefault && e?.preventDefault()
    const page = +e?.target?.dataset?.page || p || e
    const max = paginationNodes.length
    if (!page) return
    paginationNodes.forEach(i => i.classList.remove('active'))
    paginationNode.querySelector(`.pagination__link[data-page="${page}"]`).classList.add('active')
    paginationPrevNode.dataset.page = page - 1 >= 0 ? page - 1 : 0
    paginationNextNode.dataset.page = page >= max ? max : page + 1
    let urlparams = new URLSearchParams(location.search)
    urlparams.set('page', page)
    let params = urlparams.toString()
    const refresh = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + params;
    window.history.pushState({ path: refresh }, '', refresh);
  }

}