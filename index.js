let heartElement = document.getElementById('heart')
let dataElement = document.getElementById('data')

if (navigator.bluetooth === undefined) {
  dataElement.textContent = 'Web bluetooth is off now, pls turn on'
}
else {
  let buttonElement = document.getElementById('connectButton')
  buttonElement.style.cursor = 'pointer'

  let handleCharacteristicValueChanged = (event) => {
    // console.log(event.target.value)
    heartElement.hidden = false
    let heartrate = event.target.value.getUint8(1)
    dataElement.textContent = heartrate + " BPM"
  }

  let onClickEvent = (event) => {
    // alert('clicked')

    // (https://web.dev/bluetooth/)
    // https://developer.mozilla.org/en-US/docs/Web/API/Bluetooth/requestDevice
    // navigator.bluetooth.requestDevice({ acceptAllDevices: true })  // --> BluetoothDevice {id: 'MCMj57ib5biFKGrDvYLlEg==', name: 'Polar Sense B5E5C221', gatt: BluetoothRemoteGATTServer, ongattserverdisconnected: null}
    navigator.bluetooth.requestDevice({ filters: [{ name: 'Polar Sense B5E5C221' }] })
      // .then(devices => console.log(devices))
      .then(device => device.gatt.connect())  // conect to the server
      .then(server => server.getPrimaryService('heart_rate'))  // get the service
      .then(service => service.getCharacteristic('heart_rate_measurement')) // get the characteristics

      .then(characteristic => characteristic.startNotifications())  // start listenning
      .then(characteristic => {
        characteristic.addEventListener('characteristicvaluechanged', handleCharacteristicValueChanged)  // add event listener
      })      
      .catch(error => { console.error(error) })
  }
  buttonElement.addEventListener('click', onClickEvent)
}

// https://www.youtube.com/watch?v=XDc5HUVMI5U
// https://www.youtube.com/watch?v=ZIZqmXfrRLI