const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');
const convertHandler = new ConvertHandler();

suite('Unit Tests', () => {

  test('convertHandler should correctly read a whole number input', () => {
    assert.equal(convertHandler.getNum('10L'), 10);
  });

  test('convertHandler should correctly read a decimal number input', () => {
    assert.equal(convertHandler.getNum('1.5kg'), 1.5);
  });

  test('convertHandler should correctly read a fractional input', () => {
    assert.equal(convertHandler.getNum('3/4L'), 0.75);
  });

  test('convertHandler should correctly return an error on a double-fraction', () => {
    assert.equal(convertHandler.getNum('3/2/3L'), 'invalid number');
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', () => {
    assert.equal(convertHandler.getNum('kg'), 1);
  });

  test('convertHandler should correctly read each valid input unit', () => {
    assert.equal(convertHandler.getUnit('10L'), 'l');
    assert.equal(convertHandler.getUnit('5mi'), 'mi');
    assert.equal(convertHandler.getUnit('3kg'), 'kg');
  });

  test('convertHandler should correctly return an error for an invalid input unit', () => {
    assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
  });

  test('convertHandler should return the correct return unit for each valid input unit', () => {
    assert.equal(convertHandler.getReturnUnit('gal'), 'L');
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
  });

  test('convertHandler should correctly convert gal to L', () => {
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.1);
  });

  test('convertHandler should correctly convert L to gal', () => {
    assert.approximately(convertHandler.convert(1, 'l'), 0.264172, 0.1);
  });

  test('convertHandler should correctly convert mi to km', () => {
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.1);
  });

  test('convertHandler should correctly convert km to mi', () => {
    assert.approximately(convertHandler.convert(1, 'km'), 0.621371, 0.1);
  });

  test('convertHandler should correctly convert lbs to kg', () => {
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.453592, 0.1);
  });

  test('convertHandler should correctly convert kg to lbs', () => {
    assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.1);
  });
});
