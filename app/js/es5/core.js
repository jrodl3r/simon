'use strict';
var pads = document.querySelectorAll('.pad');
var pulse_duration = 300;
document.addEventListener('DOMContentLoaded', function() {
  Array.prototype.forEach.call(pads, function(el, i) {
    el.addEventListener('click', function() {
      this.className = 'pad active';
      setTimeout(function(self) {
        self.className = 'pad';
      }, pulse_duration, this);
    });
  });
});
//# sourceURL=js/es6/core.js