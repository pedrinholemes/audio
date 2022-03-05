/**
 * must be return all audio devices
 */
export async function getDevices() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter(device => device.kind === 'audioinput');
}

/**
 * must be return the device with the given id
 */
export async function getDevice(id) {
  const devices = await getDevices();
  return devices.find(device => device.deviceId === id);
}

/**
 * must print the devices in a UL and LIs and add a click event function
 * @param {(device: MediaDeviceInfo) => any} onClick
 */
export async function printDevices(onClick) {
  const devices = await getDevices();
  const ul = document.querySelector('ul#devices-list');
  devices.forEach(device => {
    const li = document.createElement('li');
    li.innerText = device.label;
    li.setAttribute('data-id', device.deviceId);
    li.addEventListener('click', () => onClick(device));
    ul.appendChild(li);
  });
}


/**
 * must be hide the devices list
 */
export function hideDevices() {
  document.querySelector('div#devices').style.display = 'none';
}
