function ConvertHandler() {
  this.getNum = function(input) {
    if (!input) return 'invalid number';

    const result = input.match(/^[\d/.]+/);
    const numStr = result ? result[0] : '1';

    if ((numStr.match(/\//g) || []).length > 1) return 'invalid number';

    try {
      return eval(numStr);
    } catch (e) {
      return 'invalid number';
    }
  };

  this.getUnit = function(input) {
    if (!input) return 'invalid unit';

    const result = input.match(/[a-zA-Z]+$/);
    if (!result) return 'invalid unit';

    const unit = result[0].toLowerCase();
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    if (!validUnits.includes(unit)) return 'invalid unit';

    return unit === 'l' ? 'L' : unit;
  };

  this.getReturnUnit = function(initUnit) {
    const pairs = {
      gal: 'L', L: 'gal',
      mi: 'km', km: 'mi',
      lbs: 'kg', kg: 'lbs'
    };
    return pairs[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const names = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    return names[unit];
  };

  this.convert = function(initNum, initUnit) {
    const rates = {
      gal: 3.78541,
      L: 1 / 3.78541,
      lbs: 0.453592,
      kg: 1 / 0.453592,
      mi: 1.60934,
      km: 1 / 1.60934
    };

    const result = initNum * rates[initUnit];
    return parseFloat(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
