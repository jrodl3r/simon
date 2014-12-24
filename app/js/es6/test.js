'use strict';

describe('This', function() {

  it('is a sanity test', function() {
    expect(true).toBe(true);
  });

  it('is an arrow function test', () => {
    expect(true).toBe(true);
  });

  it('is an es6 class test', function() {

    class Person {
      constructor(name) {
        this.name = name;
      }
      get name() {
        return this._name;
      }
      set name(newValue) {
        if(newValue) {
          this._name = newValue;
        }
      }
    }

    class Employee extends Person {

      doWork() {
        return `${this._name} is working`;
      }
    }

    let bob = new Person('Bob');
    let sam = new Employee('Sam');

    expect(bob.name).toBe('Bob');
    expect(sam.name).toBe('Sam');
    expect(sam.doWork()).toBe('Sam is working');

  });
});
