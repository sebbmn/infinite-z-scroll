import './style.css'

const el = document.querySelector('#scrollable-div')
const ratio = 9 / 16

//window.innerWidth
//window.innerHeight

const initLayout = () => {
  let root = document.querySelector('#scrollable-div')
  appendChild(3, root)
}

const appendChild = (depth, parent) => {
  const divItem = document.createElement('div')
  divItem.className = 'scrollable-div-item'
  divItem.style = `width:${50}px;height:${50}px`

  parent.append(divItem)
  depth--

  if (depth > 0) {
    parent = parent.children[0]
    appendChild(depth, parent)
  }
}

const zoom = (e) => {
  const scale = 1 + (e.deltaY * 0.01)
  const root = el.children[0]

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
