import './style.css'

const ratio = 9 / 16

const initLayout = () => {
  const windowRatio = window.innerHeight / window.innerWidth
  const root = document.querySelector('#scrollable-div')

  const startWidth = ratio < windowRatio ? window.innerHeight / ratio : window.innerWidth
  const startHeight = ratio < windowRatio ? window.innerHeight : window.innerWidth * ratio 

  const topParent = document.createElement('div')
  topParent.className = 'scrollable-div-item'
  resize(topParent, startWidth, startHeight)

  root.append(topParent)
  appendChild(3, topParent)
}

const appendChild = (depth, parent) => {
  const divItem = document.createElement('div')
  const width = parent.clientWidth / 5
  const height = Math.round(width * ratio)

  divItem.className = 'scrollable-div-item'
  resize(divItem, width, height)

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
  const topParent = root.children[0]

  const width = Math.round(scale * root.clientWidth)
  const height = Math.round(width * ratio)

  if (topParent.clientWidth > window.innerWidth && topParent.clientHeight > window.innerHeight) {
    scaleUpTree(root)
  }
  if (width < window.innerWidth && height < window.innerHeight) {
    scaleDownTree(root)
  }

  resizeTree(root, width, height)
}

const resizeTree = (element, width, height) => {
  if (element) {
    resize(element, width, height)

    element = element.children[0]
    width = width / 5
    height = Math.round(width * ratio)

    resizeTree(element, width, height)
  } else {
    return
  }
}

const resize = (element, width, height) => {
  element.style.width =  `${width}px`
  element.style.height =  `${height}px`
}

const scaleUpTree = (root) => {
  // TODO: scale up logic
  console.log('up', root)
}

const scaleDownTree = (root) => {
  // TODO: scale down logic
  console.log('down', root)
}

document.addEventListener('wheel', zoom)
initLayout()
