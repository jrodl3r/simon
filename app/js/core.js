//
// Simon Core
//
// ==========================================================================


document.addEventListener('DOMContentLoaded', function(e) {

  'use strict';

  // config
  var pads           = document.querySelectorAll('.pad');
  var pulse_duration = 300;

  // setup pads (click/tap effect)
  Array.prototype.forEach.call(pads, function(el, i) {

    el.addEventListener('click', function() {

      this.className = 'pad active';

      setTimeout(function(self) {
        self.className = 'pad';
      }, pulse_duration, this);
    });
  });

});
