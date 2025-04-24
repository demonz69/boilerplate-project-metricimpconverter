function ConvertHandler() {

  const units = ['gal', 'l', 'ml', 'km', 'lbs', 'kg'];
  const spellOut = {
    gal: 'gallons',
    l: 'liters',
    mi: 'miles',
    km: 'kilometers',
    lbs: 'pounds',
    kg: 'kilograms',

  };

  const conversions = {
    gal: (val) => val * 3.78541,
    l: (val) => val / 3.78541,
    mi: (val) => val * 1.60934,
    km: (val) => val / 1.60934,
    lbs: (val) => val * 0.453592,
    kg: (val) => val / 0.453592,
  };

  const returnUnits = {
    gal: 'l',
    l: 'gal',
    mi: 'km',
    km: 'mi',
    lbs: 'kg',
    kg: 'lbs',
  };
  
  this.getNum = function (input) {
    let result = input.match(/[\d/.]+/g);
    if (!result) return 1;
    
    result = result[0];
    if (result.match(/[a-zA-Z]/)) return 'invalid number';
    
    let num = eval(result);
    if (num === Infinity || num === -Infinity) return 'invalid number';
    
    return num;
    
  };
  
  this.getUnit = function(input) {
    let unit = input.replace(/^[\d/.]+/, '').toLowercase();
    return units.includes(unit === 'l' ? 'l' : unit) ?  (unit === 'l' ? 'l' : unit) : 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) { 
    return resultUnits[initUnit.toLowerCase()] || 'invalid unit';
  };

  this.spellOutUnit = function(unit) {
   return spellOut[unit.toLowerCase()];
  };
  
  this.convert = function(initNum, initUnit) {
    // const galToL = 3.78541;
    // const lbsToKg = 0.453592;
    // const miToKm = 1.60934;
    // let result;
    
    return parseFloat(conversions[initUnit.toLowerCase()](initNum).toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
