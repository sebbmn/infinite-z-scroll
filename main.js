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
  growTree(3, topParent)
}

const growTree = (levels, root) => {
  const divItem = document.createElement('div')
  const width = root.clientWidth / 5
  const height = Math.round(width * ratio)

  divItem.className = 'scrollable-div-item'
  resize(divItem, width, height)

  root.append(divItem)
  levels--

  if (levels > 0) {
    root = root.children[0]
    growTree(levels, root)
  }
}

const zoom = (e) => {
  const scale = 1 + (e.deltaY * 0.01)
  const root = document.querySelector('#scrollable-div')
  const topParent = root.children[0]
  const topChild = topParent.children[0]

  const width = Math.round(scale * topParent.clientWidth)
  const height = Math.round(width * ratio)

  if (topChild.clientWidth > window.innerWidth && topChild.clientHeight > window.innerHeight) {
    scaleUpTree(root)
  }
  if (width < window.innerWidth && height < window.innerHeight) {
    scaleDownTree(root)
  }

  resizeTree(topParent, width, height)
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
  console.log('up')
  const topParent = root.children[0]
  const topChild = topParent.children[0]

  root.removeChild(topParent)
  root.append(topChild)

  const botomChild = getBotomChild(topChild)

  growTree(0, botomChild)
}

const scaleDownTree = (root) => {
  // TODO: scale down logic
  console.log('down')
}

const getBotomChild = (top) => {
  let botomChild = top

  while (botomChild.children[0]) {
    botomChild = botomChild.children[0]
  }

  return botomChild
}

document.addEventListener('wheel', zoom)
initLayout()
