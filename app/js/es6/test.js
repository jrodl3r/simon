/*global app */
'use strict';

describe('This', function() {

  it('is a sanity test', function() {

    expect(true).toBe(true);
  });

  it('is an arrow function test', () => {

    expect(true).toBe(true);
  });

  it('is an es6 class test', () => {

    expect(app.name).toBe('Simon Game');

  });
});
