const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');
const handler = new ConvertHandler();

suite('Unit Tests', () => {
  test('Read a whole number input', () => assert.equal(handler.getNum('10L'), 10));
  test('Read a decimal number input', () => assert.equal(handler.getNum('3.5mi'), 3.5));
  test('Read a fractional input', () => assert.equal(handler.getNum('1/2km'), 0.5));
  test('Read a fractional input with decimal', () => assert.approximately(handler.getNum('3.3/3kg'), 1.1, 0.1));
  test('Return error on double-fraction', () => assert.equal(handler.getNum('3/2/3kg'), 'invalid number'));
  test('Default to 1 if no number', () => assert.equal(handler.getNum('kg'), 1));
  test('Read each valid input unit', () => {
    ['gal', 'l', 'mi', 'km', 'lbs', 'kg'].forEach(unit => {
      assert.equal(handler.getUnit(`32${unit}`), unit);
    });
  });
  test('Return error for invalid input unit', () => assert.equal(handler.getUnit('34kilomegagram'), 'invalid unit'));
  test('Return correct return unit', () => assert.equal(handler.getReturnUnit('gal'), 'l'));
  test('Return spelled-out string', () => assert.equal(handler.spellOutUnit('gal'), 'gallons'));
  test('Convert gal to L', () => assert.approximately(handler.convert(1, 'gal'), 3.78541, 0.1));
});
