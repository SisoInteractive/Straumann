import './index.less';
import $ from 'jquery';
import TWEEN from './tween';
import * as AM from './animations';

const DEBUG = true;

export default (language) => {
  let config = ({
    // repeat: {
    //   language: '',
    //   para: 'para',
    //   good: 'good1',
    //   whenDone: () => {
        // setTimeout(() => playEnglishVersion(), 1000);
    //   }
    // },
    chinese: {
      language: 'chinese',
      para: 'para',
      good: 'good1'
    },
    chineseMixing: {
      language: 'chineseMixing',
      para: 'para',
      good: 'good1'
    },
    english: {
      language: 'english',
      para: 'para2',
      good: 'good2'
    },
    englishMixing: {
      language: 'englishMixing',
      para: 'para2',
      good: 'good2'
    }
  })[language];
  $('.app').addClass(config.language);

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
  const DOT_DELAY = DEBUG ? 0 : 300;
  const LINE_DELAY = DEBUG ? 0 : 400;
  const ICON_DELAY = DEBUG ? 0 : 600;
  const YEAR_DELAY = DEBUG ? 0 : 1000;
  const PARA_DELAY = DEBUG ? 0 : 1400;

  let app = {
    initMainTimeline () {
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
        { name: '1980',
          extra: (selector) => {
            selector.find('.logo').fadeIn();
          } 
        },
        { 
          name: '1986',
          extraSlot2: (selector) => {
            selector.find('.icon-main').addClass(`rotate360 fast reverse`);
          }
        },
        { name: '1997', extra: (selector) => {
          selector.find('.icon-main').addClass(`rotate360 reverse`);
        } },
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
            selector.find('.more-icon').fadeIn();
          }
        },
        { 
          name: '2009',
          extraSlot2: (selector) => {
            selector.find('.icon-main').addClass(`rotate360 fast reverse`);
          }   
        },
        { 
          name: '2010'
        },
        { name: '2013' },
        { 
          name: '2015',
          extraSlot2: (selector) => {
            selector.find('.icon-main').addClass(`rotate360 fast reverse`);
            selector.find('.more-icon').fadeIn();
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
          extraSlot2: () => {
            config.whenDone && config.whenDone();
          }
        }
      ];

      //  animation play controller
      function playByTimelineIndex (index=0) {
        let currentTimeline = timelines[index];
        let nextTimelineIndex = index+1;
        let isHasNext = !!timelines[nextTimelineIndex];

        // #debug
        DEBUG && isHasNext && playByTimelineIndex(nextTimelineIndex);

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
                selector.find(`.man, .map, .${config.good}`).addClass('active');
                currentTimeline.extraSlot2 && currentTimeline.extraSlot2(selector);
              } 
            });
            AM.fadeIn({ selector: selector.find('.year'), delay: YEAR_DELAY });
            AM.fadeIn({ selector: selector.find(`.${config.para}`), delay: PARA_DELAY, callback: () => {
              !DEBUG && isHasNext && playByTimelineIndex(nextTimelineIndex);
            } });
            currentTimeline.extra && currentTimeline.extra(selector);
          }
        });
      }

      function playEnglishVersion() {
        if (DEBUG) return;
        let max = timelines.length;
        $('.data-ch').hide();
        $('.data-en').fadeIn();
        function play(index) {
          let selector = $(`.timeline${index+1 >= 10 ? (index+1) : '0'+(index+1)}`);
          selector.find('.para').hide();
          selector.find('.para2').addClass('active');
          setTimeout(() => {
            selector.find('.good1').hide();
            selector.find('.good2').addClass('active');
          }, 1000);
          // if (index+1 === max) return setTimeout(() => location.reload(), 2000);
          // else setTimeout(() => play(index+1), 2000);
          if (index+1 === max) return;
          else setTimeout(() => play(index+1), 2000);
        }
        play(0);
      }

      window.playEnglishVersion = playEnglishVersion;
      playByTimelineIndex(getCurrentIndex(timelines, '1954'));
    },
    initSummary() {
      //  summary
      setTimeout(() => {
        $('.summary, .timelines').addClass('active');
      }, 200);

      //  arrows
      setTimeout(() => {
        $('.arrows').addClass('active');
        setInterval(() => {
          $('.arrows').removeClass('active');
          setTimeout(() => $('.arrows').addClass('active'), 250);
        }, 4500)
      }, 1300);
    },

    resize () {
      //  测试缩放
      let win = window,
      doc = document,
      docElem = doc.documentElement,
      body = doc.getElementsByTagName('body')[0],
      x = win.innerWidth || docElem.clientWidth || body.clientWidth,
      y = win.innerHeight|| docElem.clientHeight|| body.clientHeight;
      let globalScale = 1;
      let scale = x/3360*globalScale;
      let appHeight = 3360*scale*0.357142857;
      //  保证高度填充满
      let height = y;
      let heightScale = 1;
      let offsetY = 0;
      if (height < appHeight) {
        heightScale = height / appHeight;
        scale*= heightScale;
      }
      else {
        offsetY = (y - appHeight)/2;
      }

      let offsetX = (x/2)*(1-globalScale*heightScale);

      document.querySelector('body').style.transform = `scale(${scale})`;
      document.querySelector('body').style.marginLeft = `${offsetX}px`;
      document.querySelector('body').style.marginTop = `${offsetY}px`;
      document.querySelector('body').style.transformOrigin = `left top`;

      this.timelineInstance && this.timelineInstance();
      this.timelineInstance = AM.initTimeline();
    },

    timelineInstance: null,

    init () {
      this.resize();
      window.addEventListener('resize', this.resize);

      this.initMainTimeline();
      this.initSummary();
    }
  };

  //  app init
  app.init();
};




