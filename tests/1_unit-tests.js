const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

  test('convertHandler should correctly read a whole number input', function () {
    assert.equal(convertHandler.getNum('32L'), 32);
  });

  test('convertHandler should correctly read a decimal number input', function () {
    assert.equal(convertHandler.getNum('3.5mi'), 3.5);
  });

  test('convertHandler should correctly read a fractional input', function () {
    assert.equal(convertHandler.getNum('1/2km'), 0.5);
  });

  test('convertHandler should correctly read a fractional input with a decimal', function () {
    assert.equal(convertHandler.getNum('4.5/2lbs'), 2.25);
  });

  test('convertHandler should correctly return an error on a double-fraction', function () {
    assert.equal(convertHandler.getNum('1/2/3kg'), 'invalid number');
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function () {
    assert.equal(convertHandler.getNum('mi'), 1);
  });

  test('convertHandler should correctly read each valid input unit', function () {
    const input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    const expected = ['gal','L','mi','km','lbs','kg','gal','L','mi','km','lbs','kg'];
    input.forEach((unit, i) => {
      assert.equal(convertHandler.getUnit('3' + unit), expected[i]);
    });
  });

  test('convertHandler should correctly return an error for an invalid input unit', function () {
    assert.equal(convertHandler.getUnit('4.2kilograms'), 'invalid unit');
  });

  test('convertHandler should return the correct return unit for each valid input unit', function () {
    const input = ['gal','L','mi','km','lbs','kg'];
    const expected = ['L','gal','km','mi','kg','lbs'];
    input.forEach((unit, i) => {
      assert.equal(convertHandler.getReturnUnit(unit), expected[i]);
    });
  });

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function () {
    const input = ['gal','L','mi','km','lbs','kg'];
    const expected = ['gallons','liters','miles','kilometers','pounds','kilograms'];
    input.forEach((unit, i) => {
      assert.equal(convertHandler.spellOutUnit(unit), expected[i]);
    });
  });

  test('convertHandler should correctly convert gal to L', function () {
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.00001);
  });

  test('convertHandler should correctly convert L to gal', function () {
    assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.00001);
  });

  test('convertHandler should correctly convert mi to km', function () {
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.00001);
  });

  test('convertHandler should correctly convert km to mi', function () {
    assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.00001);
  });

  test('convertHandler should correctly convert lbs to kg', function () {
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.00001);
  });

  test('convertHandler should correctly convert kg to lbs', function () {
    assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.00001);
  });

});
