//
// Simon Core
//
// ==========================================================================


document.addEventListener('DOMContentLoaded', function(e) {

  var pads = document.querySelectorAll('.pad');

  // Setup Pads
  Array.prototype.forEach.call(pads, function(el, i) {

    el.addEventListener('click', function() {

      // make pad active
      this.className = 'pad active';

      // deactivate all pads
      setTimeout(function() {
        Array.prototype.forEach.call(pads, function(el) {
           el.className = 'pad';
        });
      }, 300);
    });
  });

});
