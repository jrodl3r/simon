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
  }

  // getName() « 'xxx'

  // saveScore(name) XHR »

  // getScores() « XHR

  // showScores()
}

class Simon extends Game {

  constructor(name) {
    super(name);

    this._level         = 0;
    this._max_level     = 100;
    this._playing       = false;
    this._cycling       = false;
    this._pads          = $('.pad');
    this._start_btn     = $('#start');
    this._display       = $('#display');
    this._pulse_dur     = 300;
    this._seqence_dur   = 1000;
    this._message_dur   = 1000;
    this._move_dur      = 5000;
    this._timer         = [];
    this._moves         = [];
    this._cur_move      = 0;

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
      if(!this._cycling) {
        this.pulse($(e.currentTarget));
        this.update($(e.currentTarget).attr('padnum'));
      }
    });
  }

  // start game
  play() {

    // generate moves
    let x = this._max_level,
        y = this._pads.length - 1;

    while(x--) {
      this._moves.push(Math.round(Math.random() * y));
    }

    // reset & start sequence
    this._playing = true;
    this._level = 1;
    this.cycle();

  }

  // display move sequence
  cycle() {

    // disable input, queue user
    this.display('READY?', this._message_dur);
    this._cycling = true;

    // start sequence
this._level = 3; // TODO remove
    let x = this._level;

    while(x--) {
      setTimeout((y) => {
        this.pulse(this._pads.eq(this._moves[this._level - y]));

        // last cycle » re-enable input, queue user
        if(y === 1) {
          this._cycling = false;
          setTimeout(() => {
            this.display('GO!', this._message_dur * 2);
            this.timer();
          }, this._message_dur / 2);
        }
      }, (this._level - x) * this._seqence_dur, x + 1);
    }
  }

  // game timer
  timer(clear) {

    let x = this._move_dur / 1000;

    // clear timer
    if(clear) {

      while(x--) {
        clearTimeout(app._timer[x]);
        delete(app._timer[x]);
      }

    // start timer
    } else {

      while(x) {
        this._timer[x - 1] = setTimeout((y) => {
          log(y);
          // times up!
          if(y === this._move_dur / 1000) {
            this.lose('times up!');
          }
        }, x * 1000, x--);
      }
    }
  }

  // verify move
  update(pad) {

    if(this._playing) {

      // kill timer
      this.timer(1);
    // if(pad === this._moves[this._cur_move]) {

      // this.next();

    // } else {

      // this.lose();

    // }

    }
  }

  // queue next move
  next() {

    // this._cur_move ++

    // if moves[cur] = level ... level('up')

    // else moves[cur] ++

  }

  // game over
  lose(msg) {
log('game over');

    this._playing = false;
    this.display(msg, this._message_dur * 2);

    setTimeout(() => {
      this.display('game over', this._message_dur * 3);
    }, this._message_dur * 2);
  }


  // update level
  level(level) {

    this._level = level;
  }


  // trigger flash
  pulse(el) {

    el.addClass('active');
    setTimeout(() => {
      el.removeClass('active');
    }, this._pulse_dur);
  }

  // update hud display
  display(msg, dur) {
    // TODO add 'flashing' option (game over/win/etc)

    // set or clear text
    if(msg) {
      this._display.html(msg);
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
