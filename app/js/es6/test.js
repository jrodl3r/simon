'use strict';

jasmine.getFixtures().fixturesPath = 'inc';

describe('The Game', () => {

  beforeEach( () => {
    jasmine.getFixtures().load('board.html');
  });

  it('has a name', () => {
    expect(app._name).toBe('Simon');
  });

  describe('The Board', () => {

    it('has a HUD w/ a Display and a Start Button', () => {
      expect($('#hud')).toExist();
      expect($('#hud')).toContainElement('#display');
      expect($('#hud')).toContainElement('#start');
    });

    it('has 4 input pads', () => {
      expect($('#pads #pad1')).toExist();
      expect($('#pads #pad2')).toExist();
      expect($('#pads #pad3')).toExist();
      expect($('#pads #pad4')).toExist();
    });
  });

  describe('The Start Button', () => {

    beforeEach( () => {
      spyOn(app, 'play').and.callThrough();
      app.play();
    });

    it('is clickable and starts a new game', () => {

      var spyClickEvent = spyOnEvent('#start', 'click');
      $('#start').click();
      expect('click').toHaveBeenTriggeredOn('#start');
      expect(spyClickEvent).toHaveBeenTriggered();

      expect(app.play).toHaveBeenCalled();
      expect(app._playing).toBeTruthy();
      expect(app._moves.length).toBeGreaterThan(0);
      expect(app._level).toBe(1);
    });
  });

  // cycle starts sequencing

  // user-input calls update() to verify the move

  // incorrect user-input triggers loss()

});
