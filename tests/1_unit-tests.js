const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

  test('Read a whole number input', () => assert.equal(convertHandler.getNum('32L'), 32));
  test('Read a decimal number input', () => assert.equal(convertHandler.getNum('3.5mi'), 3.5));
  test('Read a fractional input', () => assert.equal(convertHandler.getNum('1/2km'), 0.5));
  test('Read a fractional input with decimal', () => assert.equal(convertHandler.getNum('4.5/2lbs'), 2.25));
  test('Error on double fraction', () => assert.equal(convertHandler.getNum('3/2/3kg'), 'invalid number'));
  test('Default to 1 if no number', () => assert.equal(convertHandler.getNum('L'), 1));

  test('Read each valid input unit', () => {
    const units = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    const expected = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    units.forEach((unit, i) => {
      assert.equal(convertHandler.getUnit('12' + unit), expected[i]);
    });
  });

  test('Return error for invalid input unit', () => {
    assert.equal(convertHandler.getUnit('5gibberish'), 'invalid unit');
  });

  test('Return correct return unit for each valid input unit', () => {
    const map = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    for (let unit in map) {
      assert.equal(convertHandler.getReturnUnit(unit), map[unit]);
    }
  });

  test('Return spelled-out string for each valid unit', () => {
    const map = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    for (let unit in map) {
      assert.equal(convertHandler.spellOutUnit(unit), map[unit]);
    }
  });

  test('Correct conversion gal to L', () => assert.equal(convertHandler.convert(1, 'gal'), 3.78541));
  test('Correct conversion L to gal', () => assert.equal(convertHandler.convert(1, 'L'), 0.26417));
  test('Correct conversion mi to km', () => assert.equal(convertHandler.convert(1, 'mi'), 1.60934));
  test('Correct conversion km to mi', () => assert.equal(convertHandler.convert(1, 'km'), 0.62137));
  test('Correct conversion lbs to kg', () => assert.equal(convertHandler.convert(1, 'lbs'), 0.45359));
  test('Correct conversion kg to lbs', () => assert.equal(convertHandler.convert(1, 'kg'), 2.20462));

});
