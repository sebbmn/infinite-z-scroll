import './style.css'

const el = document.querySelector('#scrollable-div')

const zoom = (e) => {
  const scale = 1 + (e.deltaY * 0.01)
  rescale(scale, el)
}

const rescale = (scale, element) => {
  element.style.width =  `${Math.trunc(scale * element.clientWidth)}px`
  element.style.height =  `${Math.trunc(scale * element.clientHeight)}px`
}

document.addEventListener('wheel', zoom)

