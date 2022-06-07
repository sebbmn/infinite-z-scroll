import './style.css'

const el = document.querySelector('#scrollable-div')

const zoom = (e) => {
  const scale = 1 + (e.deltaY * 0.01)
  let element = el.children[0]

  while (element) {
    rescale(scale, element)
    element = element.children[0]
  }
}

const rescale = (scale, element) => {
  element.style.width =  `${Math.round(scale * element.clientWidth)}px`
  element.style.height =  `${Math.round(scale * element.clientHeight)}px`
}

document.addEventListener('wheel', zoom)
