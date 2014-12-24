//
// Simon Core
//
// ==========================================================================
'use strict';

//
// class Game {
//   constructor(name) {
//     this.name = name;
//   }
// }
//
// class Simon extends Game {
//   constructor(name) {
//     super.constructor(name);
//     this.pads = ['pad1', 'pad2', 'pad3', 'pad4'];
//   }
// }
//
// var app = new Simon('simon game');
// console.log(app.name);








// config
var pads           = document.querySelectorAll('.pad');
var pulse_duration = 300;


document.addEventListener('DOMContentLoaded', function() {

  // setup pads (click/tap effect)
  Array.prototype.forEach.call(pads, function(el, i) {

    el.addEventListener('click', function() {

      this.className = 'pad active';
      //console.log(app.pads[this.getAttribute('padnum')]);
      //document.getElementById('hud').innerHTML = app.pads[this.getAttribute('padnum')];

      setTimeout(function(self) {
        self.className = 'pad';
      }, pulse_duration, this);
    });
  });

});
