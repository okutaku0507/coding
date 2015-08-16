module.exports = {

  counter: 0,

  getUid: function () {
    this.counter += 1;
    return this.counter;
  }
}
