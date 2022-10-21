let heartElement = document.getElementById('heart')
let dataElement = document.getElementById('data')

if (navigator.bluetooth === undefined) {
  dataElement.textContent = 'Web bluetooth is off now, pls turn on'
}
else {
  let buttonElement = document.getElementById('connectButton')
  buttonElement.style.cursor = 'pointer'

  let onClickEvent = (event) => {
    alert('clicked')
  }
  buttonElement.addEventListener('click', onClickEvent)
}