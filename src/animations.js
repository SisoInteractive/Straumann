import TWEEN from './tween';

let fadeIn = ({ selector, delay=0, callback }) => {
  const coords = { x: 0 }; // Start at (0, 0)
  const tween = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
    .delay(delay)
    .to({ x: 100 }, 1000)
    .easing(TWEEN.Easing.Quadratic.Out) 
    .onUpdate(() => { 
      selector.css('opacity', coords.x / 100);
    })
    .onComplete(() => callback && callback()).start();
  return tween;
};

let erase = ({ selector, delay=0, callback }) => {
  const coords = { x: 0 }; // Start at (0, 0)
  const target = selector.find('img').attr('height');
  const tween = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
    .delay(delay)
    .to({ x: target }, 300)
    .easing(TWEEN.Easing.Quadratic.Out)  
    .onUpdate(() => { 
      selector.css('height', coords.x);
    })
    .onComplete(() => callback && callback()).start();
  return tween;
};

let rotate = ({ selector, delay=0, speed, reverse, callback, repeat }) => {
  speed = speed || 10000;
  reverse = reverse ? -1 : 1;
  const coords = { x: 0 }; // Start at (0, 0)
  const tween = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
    .delay(delay)
    .to({ x: 360 }, speed)
    .onUpdate(() => { 
      selector.css('transform', `rotate(${coords.x * reverse}deg)`);
    })
    .repeat(repeat)
    .onComplete(() => callback && callback()).start();
  return tween;
};

let transform = ({ selector, direction, target=0, delay=0, speed=200, callback, repeat }) => {
  const coords = { x: 0 }; // Start at (0, 0)
  const tween = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
    .delay(delay)
    .to({ x: target }, speed)
    .onUpdate(() => { 
      selector.css('transform', `translateX(${coords.x * direction}px)`);
    })
    .repeat(repeat)
    .onComplete(() => callback && callback()).start();
  return tween;
};

export { fadeIn, erase, rotate, transform };