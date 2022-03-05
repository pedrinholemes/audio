import { printDevices, hideDevices } from "./device-select.js";
import { start } from './audio.js'
import { updateCanvasSize } from "./canvas.js";

updateCanvasSize()

printDevices(device => {
  hideDevices()
  start(device.deviceId)
})
