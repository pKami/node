var Currency = function(CHFPLN) {
  this.CHFPLN = CHFPLN;
}

Currency.prototype.roundTwoDecimals = function(amount) {
  return Math.round(amount * 100) / 100;
}

Currency.prototype.CHFToPLN = function(chf) {
  return this.roundTwoDecimals(chf * this.CHFPLN);
}

Currency.prototype.PLNToCHF = function(pl) {
  return this.roundTwoDecimals(pl / this.CHFPLN);
}

module.exports = Currency;
