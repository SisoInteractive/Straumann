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

function initTimeline () {
  //  balls
  let canvas = document.querySelector('.timeline-c')
  canvas.width = 2593
  canvas.style.width = '2593px'
  canvas.height = 300
  canvas.style.height = '300px'
  let ctx = canvas.getContext('2d')

  let points = [
    { x: 0, y: 21 },
    { x: 77, y: 52 },
    { x: 374, y: 0 },
    { x: 488, y: 62 },
    { x: 686, y: 12 },
    { x: 898, y: 42 },
    { x: 965, y: 8 },
    { x: 1036, y: 39 },
    { x: 1172, y: 12 },
    { x: 1231, y: 99 },
    { x: 1454, y: 45 },
    { x: 1537, y: 88 },
    { x: 1715, y: 41 },
    { x: 1786, y: 70 },
    { x: 2016, y: 22 },
    { x: 2158, y: 119 },
    { x: 2202, y: 59 },
    { x: 2423, y: 123 },
    { x: 2590, y: 76 }
  ]

  // 创建小球的构造函数
  function Ball ({x, y}) {
    this.x = x
    this.y = y
    this.originalY = y;
    this.r = 12
    this.color = 'rgb(255, 255, 255)'
    this.speedY = randomNum(-3, 3) * 0.2*0.3
  }
  Ball.prototype = {
    // 绘制小球
    draw: function () {
      // 圆边
      ctx.beginPath()
      ctx.globalAlpha = 1
      ctx.fillStyle = this.color
      ctx.lineWidth = 2
      ctx.strokeStyle = '#436ea6'
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      //  圆白色背景
      ctx.beginPath()
      ctx.globalAlpha = 1
      ctx.fillStyle = '#fff'
      ctx.arc(this.x, this.y, 12, 0, Math.PI * 2)
      ctx.fill()

      // 圆心
      ctx.beginPath()
      ctx.globalAlpha = 1
      ctx.fillStyle = '#436ea6'
      ctx.arc(this.x, this.y, 5, 0, Math.PI * 2)
      ctx.fill()
    },
    // 小球移动
    move: function () {
      this.y += this.speedY
      let max = 40;

      if (this.y < this.originalY-max ) {
        this.y = this.originalY-max;
        this.speedY *= -1
      }
      else if (this.y > this.originalY+max) {
        this.y = this.originalY+max;
        this.speedY *= -1
      }
    }
  }

  function main () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // 小球与小球之间自动画线
    drawLine()
    // 使用关键帧动画，不断的绘制和清除
    window.requestAnimationFrame(main)
  }

  function drawLine () {
    for (let i = 0; i < balls.length; i++) {
      for (let j = 0; j < balls.length; j++) {
        if (i !== j) {
          if (i + 1 === j) {
            ctx.beginPath()
            ctx.moveTo(balls[i].x, balls[i].y)
            ctx.lineTo(balls[j].x, balls[j].y)
            ctx.strokeStyle = 'black'
            ctx.lineWidth = 2
            ctx.globalAlpha = 0.7
            ctx.stroke()
          }
        }
      }

      if (i !== 0 && i !== balls.length -1) {
        balls[i].draw()
        balls[i].move()
      }
    }
  }
  function randomNum (m, n) {
    return Math.floor(Math.random() * (n - m + 1) + m)
  }

  // 存储所有的小球
  let balls = []
  balls = points.map(point => {
    point.y += 100;
    return new Ball(point);
  })
  main()
}

export { fadeIn, erase, rotate, transform, initTimeline };
