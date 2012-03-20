var Currency = require('./oocurrency')
, CHFPLN = 3.42;

currency = new Currency(CHFPLN);

console.log('50 CHF equals this amount of PLN:', currency.CHFToPLN(50));
console.log('50 PLN equals this amount of CHF:', currency.PLNToCHF(50));
