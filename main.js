import './style.css'

const SCREEN_RATIO = 1 // 9 / 16

/* */
const initLayout = () => {
  const windowRatio = window.innerHeight / window.innerWidth
  const root = document.querySelector('#scrollable-div')

  const startWidth = SCREEN_RATIO < windowRatio ? window.innerHeight / SCREEN_RATIO : window.innerWidth
  const startHeight = SCREEN_RATIO < windowRatio ? window.innerHeight : window.innerWidth * SCREEN_RATIO 

  const topParent = createDivItem(startWidth, startHeight)

  root.append(topParent)

  growTree(topParent, 3)
}

/* */
const zoom = (e) => {
  const scale = 1 + (e.deltaY * 0.001)
  const root = document.querySelector('#scrollable-div')
  const topParent = root.children[0]
  const topChild = topParent.children[0]

  const width = Math.round(scale * topParent.clientWidth)
  const height = Math.round(width * SCREEN_RATIO)

  if (topChild.clientWidth > window.innerWidth && topChild.clientHeight > window.innerHeight) {
    scaleUpTree(root)
  }
  if (width < window.innerWidth || height < window.innerHeight) {
    scaleDownTree(root)
  }

  resizeTree(topParent, width, height)
}

/* Resize a tree of HTML elements recursively */
const resizeTree = (root, width, height) => {
  if (root) {
    resize(root, width, height)

    root = root.children[0]
    width = width / 5
    height = Math.round(width * SCREEN_RATIO)

    resizeTree(root, width, height)
  } else {
    return
  }
}

/* Resize an HTML element */
const resize = (element, width, height) => {
  element.style.width =  `${width}px`
  element.style.height =  `${height}px`
}

/* Remove the div on top, add one at the bottom */
const scaleUpTree = (root) => {
  const topParent = root.children[0]
  const topChild = topParent.children[0]
  const botomChild = getBotomChild(topChild)

  root.removeChild(topParent)
  root.append(topChild)

  growTree(botomChild, 0)
}

/* Add a div on top, remove the bottom one */
const scaleDownTree = (root) => {
  const topParent = root.children[0]
  const newTop = createDivItem(topParent.clientWidth * 5, topParent.clientHeight * 5)
  const botomChild = getBotomChild(root)

  root.append(newTop)
  newTop.append(topParent)

  botomChild.parentNode.removeChild(botomChild)
}

/* Russian dolling div on n levels recursively */
const growTree = (root, levels) => {
  const width = root.clientWidth / 5
  const height = Math.round(width * SCREEN_RATIO)
  const divItem = createDivItem(width, height)

  root.append(divItem)
  levels--

  if (levels > 0) {
    root = root.children[0]
    growTree(root, levels)
  }
}

/* */
const createDivItem = (width, height) => {
  const divItem = document.createElement('div')

  divItem.className = 'scrollable-div-item'
  divItem.style.background = `#${Math.floor(Math.random()*16777215).toString(16)}`
  resize(divItem, width, height)

  return divItem
}

/* */
const getBotomChild = (top) => {
  if (top.children[0]) {
    return getBotomChild(top.children[0])
  } else {
    return top
  }
}

/* Entry point */
document.addEventListener('wheel', zoom)
initLayout()
