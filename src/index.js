import './index.less';
import $ from 'jquery';
import TWEEN from './tween';
import * as AM from './animations';

//  let TWEEN engine start play animation
function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}
requestAnimationFrame(animate);

const getCurrentIndex = (list, name) => {
  return list.findIndex(item => item.name === name);
}

//  constants
const DOT_DELAY = 300;
const LINE_DELAY = 400;
const ICON_DELAY = 600;
const YEAR_DELAY = 1000;
const PARA_DELAY = 1400;

//  timelines
let timelines = [
  { 
    name: '1954', speed: 'fast',
    extraSlot2: (selector) => {
      selector.find('.man').addClass('animated infinite leftRight');
      selector.find('.map').addClass('animated infinite rightLeft');
    }
  },
  { name: '1974' },
  { name: '1980' },
  { 
    name: '1986',
    extraSlot2: (selector) => {
      selector.find('.icon-main').addClass(`rotate360 fast reverse`);
    }  
  },
  { name: '1997' },
  { name: '1999' },
  { 
    name: '2005', 
    extraSlot2: (selector) => {
      selector.find('.icon-main').addClass(`rotate360 fast reverse`);
    },
    extra: (selector) => {
      AM.fadeIn({ selector: selector.find('.icon2'), delay: ICON_DELAY/2, callback: () => {
        AM.rotate({ selector: selector.find('.icon2-main'), repeat: Infinity }); 
      }});
    } 
  },
  { 
    name: '2007', 
    speed: 10000*0.7,
    extraSlot2: (selector) => {
      setTimeout(() => selector.find('.icon-main').addClass(`rotate360 slow reverse`), 800);
      selector.find('.icon-bg2').addClass(`rotate360 reverse`);
    },
  },
  { 
    name: '2009',
    extraSlot2: (selector) => {
      selector.find('.icon-main').addClass(`rotate360 fast reverse`);
    }   
  },
  { name: '2010' },
  { name: '2013' },
  { 
    name: '2015',
    extraSlot2: (selector) => {
      selector.find('.icon-main').addClass(`rotate360 fast reverse`);
    }    
  },
  { 
    name: '2016',
    extraSlot2: (selector) => {
      selector.find('.icon-main').addClass('animated infinite pulse');
    }
  },
  { name: '2017' },
  { 
    name: '2018',
    extraSlot2: (selector) => {
      selector.find('.icon-bg2').addClass(`rotate360 slow reverse`);
    } 
  },
  { 
    name: '2019',
    extraSlot2: (selector) => {
      selector.find('.icon-main').addClass(`rotate360 fast reverse`);
    }    
  },
  { 
    name: '2019b', 
    extraSlot2: (selector) => {
      setTimeout(() => playEnglishVersion(), 1000);
    }
  }
];

//  animation play controller
function playByTimelineIndex (index=0) {
  let currentTimeline = timelines[index];
  let nextTimelineIndex = index+1;
  let isHasNext = !!timelines[nextTimelineIndex];

  let selector = $(`.timeline${index+1 >= 10 ? (index+1) : '0'+(index+1)}`);
  AM.fadeIn({ selector: selector.find('.dot01'), callback: () => selector.find('.dot01').addClass('breath') });
  AM.erase({ 
    selector: selector.find('.line'), 
    delay: LINE_DELAY,
    callback: () => {
      AM.fadeIn({ selector: selector.find('.dot02'), delay: DOT_DELAY });
      AM.fadeIn({ 
        selector: selector.find('.icon'), 
        delay: ICON_DELAY, 
        callback: () => {
          selector.find('.icon-bg').addClass(`rotate360 ${currentTimeline.speed || ''} ${currentTimeline.reverse ? 'reverse' : ''}`);
          currentTimeline.extraSlot2 && currentTimeline.extraSlot2(selector);
        } 
      });
      AM.fadeIn({ selector: selector.find('.year'), delay: YEAR_DELAY });
      AM.fadeIn({ selector: selector.find('.para'), delay: PARA_DELAY, callback: () => {
        isHasNext && playByTimelineIndex(nextTimelineIndex);
      } });
      currentTimeline.extra && currentTimeline.extra(selector);
    }
  });
}

function playEnglishVersion() {
  let max = timelines.length;
  function play(index) {
    let selector = $(`.timeline${index+1 >= 10 ? (index+1) : '0'+(index+1)}`);
    selector.find('.para').hide();
    selector.find('.para2').addClass('active');
    setTimeout(() => {
      selector.find('.good1').hide();
      selector.find('.good2').addClass('active');
    }, 1000);
    if (index+1 === max) return setTimeout(() => location.reload(), 2000);
    else setTimeout(() => play(index+1), 2000);
  }
  play(0);
}

setTimeout(() => {
  $('.summary, .timelines').addClass('active');
  setTimeout(() => {
  }, 200);
}, 200);

//  arrows
setTimeout(() => {
  $('.arrows').addClass('active');
  setInterval(() => {
    $('.arrows').removeClass('active');
    setTimeout(() => $('.arrows').addClass('active'), 250);
  }, 4500)
}, 1300);

window.playEnglishVersion = playEnglishVersion;

playByTimelineIndex(getCurrentIndex(timelines, '1954'));
// playByTimelineIndex(3);