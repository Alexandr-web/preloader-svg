const circle = document.querySelector('.svg__circle');
const line = document.querySelector('.svg__line');
const ms = 2000;

setInterval(() => {
  circle.classList.remove('anim-circle');
  circle.classList.add('end-anim-circle');

  line.classList.add('anim-line');
}, ms);