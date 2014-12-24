'use strict';
describe('This', function() {
  it('is a sanity test', function() {
    expect(true).toBe(true);
  });
  it('is an arrow function test', (function() {
    expect(true).toBe(true);
  }));
  it('is an es6 class test', function() {
    var Person = function Person(name) {
      this.name = name;
    };
    ($traceurRuntime.createClass)(Person, {
      get name() {
        return this._name;
      },
      set name(newValue) {
        if (newValue) {
          this._name = newValue;
        }
      }
    }, {});
    var Employee = function Employee() {
      $traceurRuntime.superConstructor($Employee).apply(this, arguments);
    };
    var $Employee = Employee;
    ($traceurRuntime.createClass)(Employee, {doWork: function() {
        return (this._name + " is working");
      }}, {}, Person);
    var bob = new Person('Bob');
    var sam = new Employee('Sam');
    expect(bob.name).toBe('Bob');
    expect(sam.name).toBe('Sam');
    expect(sam.doWork()).toBe('Sam is working');
  });
});
//# sourceURL=js/es6/test.js