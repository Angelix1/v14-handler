module.exports = function(ms) {
  if (!ms) throw new TypeError("Time isn't specified");
  return new Promise((resolve) => setTimeout(resolve, ms));
};