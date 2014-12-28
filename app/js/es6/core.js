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
    this._pulse_dur     = 300;
    this._seqence_dur   = 800;

    this.interact();
  }

  // user input
  interact() {

    // start button
    this._start_btn.on('click', () => {
      this.play();
    });

    // pads
    this._pads.on('click', (event) => {
      this.pulse('user', $(event.currentTarget));
    });
  }

  // start game
  play() {

    // generate moves
    for(let i = 0, j = 3; i < 100; i++) {
      this._moves.push(Math.round(Math.random() * j));
    }

    // reset
    this._playing = true;
    this.level(1);

    // launch
    //cycle();

  }

  // display move sequence
  cycle() {

    // disable input
    this._cycling = true;

    // for(i < level) { trigger(sequence[i]) }

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
        setTimeout(function(self) {
          self.removeClass('active');
        }, this._pulse_dur, el);
      }

    // sequence cycle
    } else {
      // ...
    }
  }
}

let app = new Simon('Simon');
// $(document).ready(function(){});
