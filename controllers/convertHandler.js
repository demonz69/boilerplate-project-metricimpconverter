function ConvertHandler() {
  
  this.getNum = function (input) {
    const result = input.match(/^[\d.\/]+/);
    if (!result) return 1; // Default to 1 if no number is found
    const numStr = result[0];
    
    if (numStr.split('/').length > 2) return 'invalid number';

    try {
      return eval(numStr);
    } catch (e) {
      return 'invalid number';
    }
  };

 
  this.getUnit = function (input) {
    const result = input.match(/[a-zA-Z]+$/);
    if (!result) return 'invalid unit';

    const unit = result[0].toLowerCase();
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

    if (!validUnits.includes(unit)) {
      return 'invalid unit';
    }

    return unit === 'l' ? 'L' : unit;
  };
    
  
  this.getReturnUnit = function (initUnit) {
    const units = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    return units[initUnit];
    
  };

  this.spellOutUnit = function (unit) {
    const units = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    return units[unit];
    
  };
  
  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      default:
        return null; // Invalid unit
    }

    return parseFloat(result.toFixed(5)); // Round to 5 decimal places
    
  };
  
  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    
  };
}
  

module.exports = ConvertHandler;
