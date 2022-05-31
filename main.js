import './style.css'

let scale = 1
const el = document.querySelector('#scrollable-div')

const zoom = (e) => {
  scale += e.deltaY * -0.01

  // Restrict scale
  scale = Math.min(Math.max(.125, scale), 4)

  // Apply scale transform
  el.style.transform = `scale(${scale})`
}

document.addEventListener('wheel', zoom)

