import {cleanBars, generateColor} from './utils.js';

/**
 * must be print the bars sizes of the frequency
 * @param {Uint8Array} bars 
 */
export function printBars(bars) {
  const cleanedBars = cleanBars(bars);
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const width = canvas.width;

  const height = canvas.height;
  const barWidth = width / cleanedBars.length;

  const colors = generateColor('#007bff', '#ff7b00', cleanedBars.length);

  ctx.clearRect(0, 0, width, height);
  cleanedBars.forEach((bar, index) => {
    ctx.fillStyle = '#' + colors[index];
    ctx.fillRect((barWidth * index)-1, height - bar, barWidth, bar);
  });
}


//must be update the canvas size
export function updateCanvasSize() {
  const canvas = document.querySelector('canvas#analyser_render');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', () => updateCanvasSize())
