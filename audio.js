import { printBars } from './canvas.js'

/**
 * must be return the microphone stream
 * @param {string} deviceID
 * @returns
 */
function getMicrophone(deviceID) {
  return navigator.mediaDevices.getUserMedia({
    audio: {
      deviceId: deviceID ? { ideal: deviceID } : undefined,
      noiseSuppression: true,
      // latency: 0,
    }
  });
}

/**
 * must be initialize the microphone stream and create a new audio context
 * @param {MediaStream} stream 
 * @returns 
 */
function initMicrophone(stream) {
  const audioContext = new AudioContext();
  const microphone = audioContext.createMediaStreamSource(stream);
  return microphone;
}

/**
 * must be analyze the microphone stream and return the frequency
 * @param {MediaStreamAudioSourceNode} microphone 
 * @returns 
 */
function analyzeMicrophone(microphone) {
  const analyser = microphone.context.createAnalyser();
  microphone.connect(analyser);
  return analyser
}


/**
 * must be return the bars sizes of the frequency
 * @param {AnalyserNode} analyser
 * @returns
 */
function getBars(analyser) {
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  analyser.getByteFrequencyData(dataArray);
  return dataArray;
}

/**
 * must be start all the audio functions
 * @param {string} deviceID 
 */
export async function start(deviceID) {
  const microphone = await getMicrophone(deviceID);
  const microphoneStream = initMicrophone(microphone);
  const analyser = analyzeMicrophone(microphoneStream);
  loop(analyser)
}


/**
 * must be loop the printBars function
 * @param {AnalyserNode} analyser 
 */
function loop(analyser) {
  const bars = getBars(analyser);
  printBars(bars);
  requestAnimationFrame(() => loop(analyser));
}

