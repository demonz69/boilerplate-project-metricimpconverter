const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    test('convertHandler should correctly read a whole number input', function () {
        assert.equal(convertHandler.getNum('32L'), 32);
    });
    test('convertHandler should correctly read a decimal number input', function () {
        assert.equal(convertHandler.getNum('32.5L'), 32.5);
    });
    test('convertHandler should correctly read a fractional input', function () {
        assert.equal(convertHandler.getNum('1/2L'), 0.5);
    });
    test('convertHandler should correctly read a fractional input with a decimal', function () {
        assert.equal(convertHandler.getNum('1.5/2L'), 0.75);
    });
    test('convertHandler should correctly return an error on a double-fraction', function () {
        assert.equal(convertHandler.getNum('1/2/3L'), 'invalid number');
    });
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function () {
        assert.equal(convertHandler.getNum('L'), 1);
    });

    test('valid units', function () {
        assert.equal(convertHandler.getUnit('gal'), 'gal');
        assert.equal(convertHandler.getUnit('l'), 'L');
        assert.equal(convertHandler.getUnit('mi'), 'mi');
        assert.equal(convertHandler.getUnit('km'), 'km');
        assert.equal(convertHandler.getUnit('lbs'), 'lbs');
        assert.equal(convertHandler.getUnit('kg'), 'kg');
    });
    test('invalid unit', function () {
        assert.equal(convertHandler.getUnit('abc'), 'invalid unit');
    });
    test('convertHandler should return the correct return unit for each valid unit', function () {
        assert.equal(convertHandler.getReturnUnit('gal'), 'L');
        assert.equal(convertHandler.getReturnUnit('L'), 'gal');
        assert.equal(convertHandler.getReturnUnit('mi'), 'km');
        assert.equal(convertHandler.getReturnUnit('km'), 'mi');
        assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
        assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
    });
    test('convertHandler should correctly return the spelled-out string unit for each valid unit', function () {
        assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
        assert.equal(convertHandler.spellOutUnit('L'), 'liters');
        assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
        assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
        assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
        assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
    });
    test('convert gal to l', () => 
        assert.equal(convertHandler.convert(1, 'gal'), 3.78541));
    test('convert l to gal', () =>
        assert.equal(convertHandler.convert(1, 'L'), 0.264172));
    test('convert mi to km', () =>
        assert.equal(convertHandler.convert(1, 'mi'), 1.60934));
    test('convert km to mi', () =>
        assert.equal(convertHandler.convert(1, 'km'), 0.621371));
    test('convert lbs to kg', () =>
        assert.equal(convertHandler.convert(1, 'lbs'), 0.453592));
    test('convert kg to lbs', () =>
        assert.equal(convertHandler.convert(1, 'kg'), 2.20462));


});