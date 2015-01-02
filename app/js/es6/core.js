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

    this.interact();
  }

  // reset
  init() { log('init()');

    // reset & start sequence
    this._level         = 1;
    this._timer         = [];
    this._moves         = [];
    this._cur_move      = 0;

    // generate moves
    let x = this._max_level,
        y = this._pads.length - 1;

    while(x--) {
      this._moves.push(Math.round(Math.random() * y));
    }
  }

  // user input
  interact() {

    // start button
    this._start_btn.on('click', (e) => {
      e.preventDefault();
      if(!this._playing) {
        this.play();
      }
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

    this._playing = true;
    this.init();
    this.cycle();
  }

  // reveal sequence
  cycle() { log('cycle()');

    let x = this._level;

    // disable input, queue user
    this._cycling = true;

    if(this._level > 1) {
      this.display('level ' + this._level);
    } else {
      this.display('ready?', this._message_dur);
    }

    // start sequence
    while(x--) {
      setTimeout((y) => {
        this.pulse(this._pads.eq(this._moves[this._level - y]));

        // last cycle » re-enable input, queue user
        if(y === 1) {
          this._cycling = false;
          setTimeout(() => {
            this.display('go!', this._message_dur * 2);
            this.timer(1);
          }, this._message_dur);
        }
      }, (this._level - x) * this._seqence_dur, x + 1);
    }
  }

  // game timer
  timer(start) {

    let x = this._move_dur / 1000;

    // start timer
    if(start) {
      while(x) {
        this._timer[x - 1] = setTimeout((y) => { log('timer: ' + y);

          // times up!
          if(y === this._move_dur / 1000) {
            this.lose('times up!');
          }
        }, x * 1000, x--);
      }

    // kill timer
    } else { log('kill timer');
      while(x--) {
        clearTimeout(this._timer[x]);
        delete(this._timer[x]);
      }
    }
  }

  // verify input/move
  update(pad) { log('update() : ' + parseInt(pad) + ', ' + this._moves[this._cur_move]);

    if(this._playing) {

      // kill timer
      this.timer(0);

      // correct move
      if(parseInt(pad) === this._moves[this._cur_move]) {
        this._cur_move = this._cur_move + 1;
        this.next();

      // incorrect move
      } else {
        this.lose('oops!');
      }
    }
  }

  // next move
  next() { log('next() : ' + this._cur_move + ', ' + this._level);

    // level complete
    if(this._cur_move === this._level) {
      this._cur_move = 0;
      this.level(this._level + 1);
      setTimeout(() => {
        this.cycle();
      }, this._message_dur);

    // reset timer
    } else {
      this.timer(1);
    }
  }

  // game over
  lose(msg) { log('lose()');

    this._playing = false;
    this.timer(0);
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

    // set/clear text
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
