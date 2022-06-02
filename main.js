import './style.css'

let scale = 1
const el = document.querySelector('#scrollable-div')

const zoom = (e) => {
  scale += e.deltaY * -0.01
  el.style.transform = `scale(${scale})`
}

document.addEventListener('wheel', zoom)

