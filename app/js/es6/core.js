//
// Simon Core
//
// ==========================================================================
'use strict';


// --------------------------------------------------------------------------
// Utilities
// --------------------------------------------------------------------------

// logger
var debug = true;
function log(s) {
  if(debug) { console.log(s); }
}

// detect touch
if (!("ontouchstart" in document.documentElement)) {
  document.documentElement.className += " no-touch";
}


// --------------------------------------------------------------------------
// The Game
// --------------------------------------------------------------------------

class Game {
  constructor(name) {
    this.name = name;
    log('Loading ' + name + '...');
  }
}

class Simon extends Game {
  constructor(name) {
    super(name);


    this.pads = ['pad 01', 'pad 02', 'pad 03', 'pad 04'];
  }
}

let app = new Simon('Simon');
// log(app.name);








// config
var pads           = document.querySelectorAll('.pad');
var pulse_duration = 300;


document.addEventListener('DOMContentLoaded', function() {

  // setup pads (click/tap effect)
  Array.prototype.forEach.call(pads, function(el, i) {

    el.addEventListener('click', function() {

      this.className = 'pad active';
      log(app.pads[this.getAttribute('padnum')]);
      document.getElementById('display').innerHTML = app.pads[this.getAttribute('padnum')];

      setTimeout(function(self) {
        self.className = 'pad';
      }, pulse_duration, this);
    });
  });

});
