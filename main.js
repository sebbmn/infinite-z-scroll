import './style.css'

const el = document.querySelector('#scrollable-div')
const ratio = 9 / 16

const zoom = (e) => {
  const scale = 1 + (e.deltaY * 0.01)

  let element = el.children[0]
  let width = Math.round(scale * element.clientWidth)
  let height = Math.round(width * ratio)

  while (element) {
    resize(element, width, height)
    element = element.children[0]
    width = width / 5
    height = Math.round(width * ratio)
  }
}

const resize = (element, width, height) => {
  element.style.width =  `${width}px`
  element.style.height =  `${height}px`
}

document.addEventListener('wheel', zoom)
