const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

suite('Unit Tests', () => {
  const convertHandler = new ConvertHandler();

  test('Should correctly read a whole number input', () => {
    assert.strictEqual(convertHandler.getNum('32L'), 32);
  });

  test('Should correctly read a decimal number input', () => {
    assert.strictEqual(convertHandler.getNum('3.2kg'), 3.2);
  });

  test('Should correctly read a fractional input', () => {
    assert.strictEqual(convertHandler.getNum('3/4lbs'), 0.75);
  });

  test('Should correctly read a fractional input with a decimal', () => {
    assert.strictEqual(convertHandler.getNum('5.4/3mi'), 1.8);
  });

  test('Should return error on a double fraction (3/2/3)', () => {
    assert.strictEqual(convertHandler.getNum('3/2/3kg'), 'invalid number');
  });

  test('Should default to 1 when no numerical input is provided', () => {
    assert.strictEqual(convertHandler.getNum('kg'), 1);
  });

  test('Should correctly read each valid input unit', () => {
    const units = ['gal','L','mi','km','lbs','kg'];
    units.forEach(unit => {
      assert.strictEqual(convertHandler.getUnit('5' + unit), unit);
    });
  });

  test('Should return error for invalid input unit', () => {
    assert.strictEqual(convertHandler.getUnit('32g'), 'invalid unit');
  });

  test('Should return correct return unit for each valid input unit', () => {
    const inputUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const expected = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
    inputUnits.forEach((unit, i) => {
      assert.strictEqual(convertHandler.getReturnUnit(unit), expected[i]);
    });
  });

  test('Should correctly return the spelled-out string unit for each valid input unit', () => {
    const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const output = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
    input.forEach((unit, i) => {
      assert.strictEqual(convertHandler.spellOutUnit(unit), output[i]);
    });
  });

  test('Should correctly convert gal to L', () => {
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.1);
  });

  test('Should correctly convert L to gal', () => {
    assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.1);
  });

  test('Should correctly convert mi to km', () => {
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.1);
  });

  test('Should correctly convert km to mi', () => {
    assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.1);
  });

  test('Should correctly convert lbs to kg', () => {
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.1);
  });

  test('Should correctly convert kg to lbs', () => {
    assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.1);
  });
});
// fuck you
