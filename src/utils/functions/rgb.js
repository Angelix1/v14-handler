module.exports = function(hex) {  
  const int = (!hex) ?
    parseInt(('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6), 16) :
    parseInt(hex.replace('#', ''), 16);
  
  return[(int & 0xff0000) >> 16, (int & 0x00ff00) >> 8, (int & 0x0000ff)];
};