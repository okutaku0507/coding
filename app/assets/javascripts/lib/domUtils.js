module.exports = {

  loadFocus: function(input) {
    input.focus();
    input.selectionStart = input.selectionEnd = input.value.length;
  },

  goBottom: function(elm) {
    elm.scrollTop = elm.scrollHeight;
  }
}