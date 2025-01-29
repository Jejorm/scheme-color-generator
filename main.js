// fetch('https://www.thecolorapi.com/scheme?hex=0047AB&format=html&mode=analogic&count=6')

const inputColor = document.getElementById('color-input')
const selectedMode = document.getElementById('selected-mode')
const getColorScheme = document.getElementById('get-color-scheme')
const colorsContainer = document.getElementById('colors-container')

getColorScheme.addEventListener('click', () => {
  colorsContainer.innerHTML = ''
  fetch(`https://www.thecolorapi.com/scheme?hex=${inputColor.value.substring(1)}&mode=${selectedMode.textContent}&count=5`)
    .then(response => response.json())
    .then(data => {
      data.colors.forEach(color => {
        const colorInformationContainer = document.createElement('div')
        const colorElement = document.createElement('div')
        const hexValueElement = document.createElement('p')
        colorElement.style.backgroundColor = color.hex.value
        hexValueElement.textContent = color.hex.value
        colorInformationContainer.appendChild(colorElement)
        colorInformationContainer.appendChild(hexValueElement)
        colorsContainer.appendChild(colorInformationContainer)
      })
    })
})

colorsContainer.addEventListener('click', (event) => {
  if (event.target.tagName === 'DIV') {
    const hexValue = event.target.nextElementSibling.textContent
    navigator.clipboard.writeText(hexValue)
    alert('Copied to clipboard!')
  }
})
