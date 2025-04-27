'use strict';

function ConvertHandler() {

  this.getNum = function(input) {
    const result = input.match(/[.\d\/]+/g);
    if (!result) return 'invalid number';
    
    let numStr = result[0];
    if (numStr.includes('/')) {
      const parts = numStr.split('/');
      if (parts.length !== 2) return 'invalid number'; // Handle double fractions like 3/2/3
      return parseFloat(parts[0]) / parseFloat(parts[1]);
    }
    return parseFloat(numStr);
  };

  this.getUnit = function(input) {
    const result = input.match(/[a-zA-Z]+/g);
    if (!result) return 'invalid unit';
    
    const unit = result[0].toLowerCase();
    if (['gal', 'l', 'mi', 'km', 'lbs', 'kg'].indexOf(unit) === -1) {
      return 'invalid unit';
    }
    return unit;
  };

  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      gal: 'L',
      l: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    return unitMap[initUnit.toLowerCase()];
  };

  this.convert = function(initNum, initUnit) {
    const conversionRates = {
      gal: 3.78541,
      l: 0.264172,
      mi: 1.60934,
      km: 0.621371,
      lbs: 0.453592,
      kg: 2.20462
    };
    
    return initNum * conversionRates[initUnit.toLowerCase()];
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${initUnit} is ${returnNum} ${returnUnit}`;
  };

}

module.exports = ConvertHandler;
