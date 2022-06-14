import './style.css'

const ratio = 9 / 16

const initLayout = () => {
  const root = document.querySelector('#scrollable-div')
  const topParent = document.createElement('div')
  const windowRatio = window.innerHeight / window.innerWidth

  const startWidth = ratio < windowRatio ? window.innerHeight / ratio : window.innerWidth
  const startHeight = ratio < windowRatio ? window.innerHeight : window.innerWidth * ratio 

  topParent.className = 'scrollable-div-item'
  topParent.style = `width:${startWidth}px;height:${startHeight}px`

  root.append(topParent)

  appendChild(3, topParent)
}

const appendChild = (depth, parent) => {
  const divItem = document.createElement('div')
  const width = parent.clientWidth / 5
  const height = Math.round(width * ratio)

  divItem.className = 'scrollable-div-item'
  divItem.style = `width:${width}px;height:${height}px`

  parent.append(divItem)
  depth--

  if (depth > 0) {
    parent = parent.children[0]
    appendChild(depth, parent)
  }
}

const zoom = (e) => {
  const scale = 1 + (e.deltaY * 0.01)
  const root = document.querySelector('#scrollable-div').children[0]

  const width = Math.round(scale * root.clientWidth)
  const height = Math.round(width * ratio)

  rescaleTree(root, width, height)
}

const rescaleTree = (element, width, height) => {
  if (element) {
    resize(element, width, height)

    element = element.children[0]
    width = width / 5
    height = Math.round(width * ratio)

    rescaleTree(element, width, height)
  } else {
    return
  }
}

const resize = (element, width, height) => {
  element.style.width =  `${width}px`
  element.style.height =  `${height}px`
}

document.addEventListener('wheel', zoom)
initLayout()
