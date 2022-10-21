let heartElement = document.getElementById('heart')
let dataElement = document.getElementById('data')
let connectBtnElement = document.getElementById('connectButton')
let hrBtnElement = document.getElementById('hrButton')

if (navigator.bluetooth === undefined) {
  alert('Web bluetooth is off now, pls turn on')
}
else {
  connectBtnElement.style.cursor = 'pointer'

  let server = null

  let onConnectBtnClick = (event) => {
    // alert('clicked')
    // navigator.bluetooth.requestDevice({ acceptAllDevices: true })  // --> BluetoothDevice {id: 'MCMj57ib5biFKGrDvYLlEg==', name: 'Polar Sense B5E5C221', gatt: BluetoothRemoteGATTServer, ongattserverdisconnected: null}
    navigator.bluetooth.requestDevice({
      filters: [{ name: 'Polar Sense B5E5C221' }],
      // optionalServices: ["battery_service"],
    })
      // .then(devices => console.log(devices))
      .then(device => {  // conect to the server
        server = device.gatt.connect()
        return server
      })
      .catch(error => { console.error(error) })
  }
  connectBtnElement.addEventListener('click', onConnectBtnClick)

  let onHrBtnClick = (event) => {
    if (server === null) {
      alert('Pls connect device first')
    } else {
      let handleCharacteristicValueChanged = (event) => {
        // console.log(event.target.value)
        heartElement.hidden = false
        let heartrate = event.target.value.getUint8(1)
        dataElement.textContent = heartrate + " BPM"
      }
      server
        .then(server => server.getPrimaryService('heart_rate'))  // get the service
        .then(service => service.getCharacteristic('heart_rate_measurement')) // get the characteristics
  
        .then(characteristic => characteristic.startNotifications())  // start listenning
        .then(characteristic => {
          characteristic.addEventListener('characteristicvaluechanged', handleCharacteristicValueChanged)  // add event listener
        })      
        .catch(error => console.error(error))
    }
  }
  hrBtnElement.addEventListener('click', onHrBtnClick)
}

