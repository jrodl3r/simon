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
  if (local_debug) { console.log(s); }
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
    this._seqence_dur   = 700;
    this._message_dur   = 1000;
    this._move_dur      = 5000;
    this._sounds        = { green: 0, red: 0, blue: 0, yellow: 0, gameover: 0 };

    this.initAudio();
    this.interact();
  }

  // setup sound
  initAudio() {

    let green_file, red_file, blue_file, yellow_file, gameover_file;

    // check if Audio() is supported
    if (typeof Audio !== 'undefined' && Audio !== null) {

      // load WAV
      if ((new Audio()).canPlayType('audio/ogg; codecs=vorbis') === '') {
        green_file    = '../../audio/pad-green.wav';
        red_file      = '../../audio/pad-red.wav';
        blue_file     = '../../audio/pad-blue.wav';
        yellow_file   = '../../audio/pad-yellow.wav';
        gameover_file = '../../audio/game-over.wav';

      // load OGG
      } else {
        green_file    = '../../audio/pad-green.ogg';
        red_file      = '../../audio/pad-red.ogg';
        blue_file     = '../../audio/pad-blue.ogg';
        yellow_file   = '../../audio/pad-yellow.ogg';
        gameover_file = '../../audio/game-over.ogg';
      }

      // buffer sounds
      this._sounds['green']    = new Audio(green_file);
      this._sounds['red']      = new Audio(red_file);
      this._sounds['blue']     = new Audio(blue_file);
      this._sounds['yellow']   = new Audio(yellow_file);
      this._sounds['gameover'] = new Audio(gameover_file);
    }
  }

  // play sound
  playAudio(id) {

    switch (id) {
      case '0':
        this._sounds['green'].play();
        break;
      case '1':
        this._sounds['red'].play();
        break;
      case '2':
        this._sounds['blue'].play();
        break;
      case '3':
        this._sounds['yellow'].play();
        break;
      case 'gameover':
        this._sounds['gameover'].play();
        break;
      default:
        console.log('error: sound not found');
    }
  }

  // reset
  init() {

    // reset & start sequence
    this._level         = 1;
    this._timer         = [];
    this._moves         = [];
    this._cur_move      = 0;
    this._gameover      = false;

    // generate moves
    let x = this._max_level,
        y = this._pads.length - 1;

    while (x--) {
      this._moves.push(Math.round(Math.random() * y));
    }
  }

  // user input
  interact() {

    // start button
    this._start_btn.on('click', (e) => {
      e.preventDefault();

      // wait for game to finish before restarting
      if (!this._playing) {
        this.play();
      }
    });

    // pads
    this._pads.on('click', (e) => {

      // don't process if cycling moves
      if (!this._cycling) {
        this.pulse($(e.currentTarget));

        // don't update if game has ended
        if (!this._gameover) {
          this.update($(e.currentTarget).attr('padnum'));
        }
      }
    });
  }

  // start game
  play() {

    this._playing = true;
    this._cycling = true;
    this.init();
    this.cycle();
  }

  // reveal sequence
  cycle() { //log('cycle()');

    let x = this._level;

    // queue the user
    if (this._level > 1) {
      this.display('level ' + this._level);
    } else {
      this.display('ready?', this._message_dur);
    }

    // start sequence
    while (x--) {
      setTimeout((y) => {
        this.pulse(this._pads.eq(this._moves[this._level - y]));

        // last cycle » queue user, start timer
        if (y === 1) {
          setTimeout(() => {
            this._cycling = false;
            this.display('go!', this._message_dur * 2);
            this.timer(1);
          }, this._message_dur / 2);
        }
      }, (this._level - x) * this._seqence_dur, x + 1);
    }
  }

  // game timer
  timer(start) {

    let x = this._move_dur / 1000;

    // start timer
    if (start) {
      while (x) {
        this._timer[x - 1] = setTimeout((y) => { //log('timer: ' + y);
          if (y === this._move_dur / 1000) { // times up!
            this.lose('times up!');
            this.timer(0);
          }
        }, x * 1000, x--);
      }

    // kill timer
    } else { //log('kill timer');
      while (x--) {
        clearTimeout(this._timer[x]);
        delete(this._timer[x]);
      }
    }
  }

  // verify input/move
  update(pad) { //log('update() : ' + parseInt(pad) + ', ' + this._moves[this._cur_move]);

    if (this._playing) {
      this.timer(0); // kill timer

      // correct move
      if (parseInt(pad) === this._moves[this._cur_move]) {
        this._cur_move += 1;
        this.next();

      // incorrect move
      } else {
        this.lose('oops!');
      }
    }
  }

  // next move
  next() { //log('next() : ' + this._cur_move + ', ' + this._level);

    // level complete
    if (this._cur_move === this._level) {
      this._cur_move = 0;
      this._cycling = true;
      this.level(this._level + 1);
      setTimeout(() => {
        this.cycle();
      }, this._message_dur);

    // restart timer
    } else {
      this.timer(1);
    }
  }

  // game over
  lose(msg) { //log('lose()');

    // disable input, display message
    this._gameover = true;
    this.display(msg, this._message_dur * 2);

    // game-over outro
    setTimeout(() => {
      this.playAudio('gameover');
      this.display('game over', this._message_dur * 3);
      this._playing = false;
    }, this._message_dur * 2);
  }

  // update level
  level(level) {

    this._level = level;
  }

  // flash + play sound
  pulse(el) {

    this.playAudio(el.attr('padnum'));
    el.addClass('active');
    setTimeout(() => {
      el.removeClass('active');
    }, this._pulse_dur);
  }

  // update hud display
  display(msg, dur) { //log('display(' + msg + ', ' + dur + ')');

    // set/clear text
    if (msg) {
      this._display.html(msg);
    } else {
      this._display.html('&nbsp;');
    }

    // clear after duration
    if (dur) {
      setTimeout(() => {
        this.display(0);
      }, dur);
    }
  }
}

let app = new Simon('Simon');
