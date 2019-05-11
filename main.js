const firePixelArray = []
const fireWidth = 10
const fireHeight = 10
const fireSize = fireWidth * fireHeight


function start() {
  createFireDataStructure()
  createFireSource()
  renderFire()
  setInterval(calculateFirePropagation, 1000)
}

function createFireDataStructure() {
  const numberOfPixels = fireWidth * fireHeight
  for (let i = 0; i < numberOfPixels; i++) {
    firePixelArray[i] = 0
  }
}


function calculateFirePropagation() {
  for (let column = 0; column < fireWidth; column++) {
    for (let row = 0; row < fireHeight; row++) {
      const pixelIndex = column + (fireWidth * row)
      
      updateFireIntensityPerPixel(pixelIndex)
    }
  }

  renderFire()
}

function updateFireIntensityPerPixel(currentPixelIndex) {
  const belowPixelIndex = currentPixelIndex + fireWidth

  if (belowPixelIndex >= fireSize) {
    return
  }

  const decay = 1
  const belowPixelFireIntensity = firePixelArray[belowPixelIndex]
  const newFireIntensity = belowPixelFireIntensity - decay

  firePixelArray[currentPixelIndex] = newFireIntensity
}

function renderFire() {
  let html = '<table cellpadding=0 cellspacing=0>'

  for (let row = 0; row < fireHeight; row++) {
    html += '<tr>'

    for (let column = 0; column < fireWidth; column++) {
      const pixelIndex = column + (fireWidth * row)
      const fireIntensity = firePixelArray[pixelIndex]
      html += '<td>'
      html += `<div class="pixel-index">${pixelIndex}</div>`
      html += fireIntensity
      html += '</td>'
    }

    html += '</tr>'
  }


  html += '</table>'

  document.getElementById('fireDoom').innerHTML = html
}

function createFireSource() {
  for (let column = 0; column <= fireWidth; column++) {
    const pixelIndex = (fireSize - fireWidth) + column

    firePixelArray[pixelIndex] = 36
  }
}


start()