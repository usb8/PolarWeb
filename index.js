let heartElement = document.getElementById('heart')
let dataElement = document.getElementById('data')

if (navigator.bluetooth === undefined) {
  dataElement.textContent = 'Web bluetooth is off now, pls turn on'
}
else {
  let buttonElement = document.getElementById('connectButton')
  buttonElement.style.cursor = 'pointer'

  let onClickEvent = (event) => {
    // alert('clicked')

    // (https://web.dev/bluetooth/)
    // https://developer.mozilla.org/en-US/docs/Web/API/Bluetooth/requestDevice
    // navigator.bluetooth.requestDevice({ acceptAllDevices: true })  // --> BluetoothDevice {id: 'MCMj57ib5biFKGrDvYLlEg==', name: 'Polar Sense B5E5C221', gatt: BluetoothRemoteGATTServer, ongattserverdisconnected: null}
    navigator.bluetooth.requestDevice({ filters: [{ name: 'Polar Sense B5E5C221' }] })
      .then(devices => console.log(devices))
      .catch(error => { console.error(error) })
  }
  buttonElement.addEventListener('click', onClickEvent)
}