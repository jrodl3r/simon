//
// Simon Core
//
// ==========================================================================
'use strict';


// --------------------------------------------------------------------------
// Utils
// --------------------------------------------------------------------------

// debug logger
var local_debug = true;
var log = function(s) {
  if(local_debug) { console.log(s); }
};
log.error = function(s) {
  if(local_debug) { console.error(s); }
};

// detect touch
if (!('ontouchstart' in document.documentElement)) {
  document.documentElement.className += ' no-touch';
}


// --------------------------------------------------------------------------
// The Game
// --------------------------------------------------------------------------

class Game {

  constructor(name) {
    this._name = name;
    //log(this._name);
  }

  // getName() « 'xxx' input

  // saveScore(name) XHR »

  // getScores() « list XHR

  // showScores()
}

class Simon extends Game {

  constructor(name) {
    super(name);

    this._moves         = [];
    this._level         = 0;
    this._playing       = false;
    this._cycling       = false;
    this._pads          = $('.pad');
    this._start_btn     = $('#start');
    this._display       = $('#display');
    this._pulse_dur     = 300;
    this._seqence_dur   = 1000;

    this.interact();
  }

  // user input
  interact() {

    // start button
    this._start_btn.on('click', (e) => {
      e.preventDefault();
      this.play();
    });

    // pads
    this._pads.on('click', (e) => {
      this.pulse('user', $(e.currentTarget));
    });
  }

  // start game
  play() {

    // generate moves TODO
    for(let i = 0, j = 3; i < 100; i++) {
      this._moves.push(Math.round(Math.random() * j));
    }

    // reset settings
    this._playing = true;
    this.level(1);

    // start sequence
    this.cycle();

  }

  // display move sequence
  cycle() {

    // disable input, queue user
    this.display('READY?', this._seqence_dur);
    this._cycling = true;

    // start sequence
    let i = this._level;

    while(i) {
      setTimeout((x) => {
        this.pulse('cycle', this._pads.eq(this._moves[this._level - x]));

        // last cycle: enable input, queue user
        if(x === 1) {
          this._cycling = false;
          this.display('GO!', this._seqence_dur * 2);
          // TODO start timer .... show "5", "4", "3", "2", "1"
        }
      }, ((this._level - i) + 1) * this._seqence_dur, i);
      i--;
    }
  }

  // verify move
  update(pad_id) {
    log(pad_id);

    // check pad_id against moves[cur]

      // if pad_id !== moves[cur] ... lose()

      // if pad_id === moves[cur] ... next()

  }

  // queue next move
  next() {

    // if moves[cur] = level ... level('up')

    // else moves[cur] ++

  }

  // game over
  lose() {

    // show game end outro

  }


  // update level
  level(level) {

    this._level = level;
  }


  // make pad flash
  pulse(type, el) {

    // user input
    if(type === 'user') {
      if(!this._cycling) {
        el.addClass('active');
        this.update(el.attr('padnum'));
        setTimeout(() => {
          el.removeClass('active');
        }, this._pulse_dur);
      }

    // cycling moves
    } else {
      el.addClass('active');
      this.update(el.attr('padnum'));
      setTimeout(() => {
        el.removeClass('active');
      }, this._pulse_dur);
    }
  }

  // update hud display
  display(str, dur) {
    if(str) {
      this._display.html(str);
    } else {
      this._display.html('&nbsp;');
    }
    // clear after duration
    if(dur) {
      setTimeout(() => {
        this.display(0);
      }, dur);
    }
  }
}

let app = new Simon('Simon');
// $(document).ready(function(){});
