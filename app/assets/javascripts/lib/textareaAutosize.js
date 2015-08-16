var _ = require('underscore');

module.exports = function (id, otherElementIds, lineHeight, height) {

  var ta = document.getElementById(id);
  var initialLineHeight = lineHeight || getComputedStyle(ta)['line-height'];
  var initialHeight = height || getComputedStyle(ta)['height'];
  ta.style.lineHeight = initialLineHeight;
  ta.style.height = initialHeight;

  var changeHeight = function (target, newHeight) {
    target.style.height = newHeight;
    if (_.isArray(otherElementIds)) {
      _.each(otherElementIds, function (id) {
        var el = document.getElementById(id);
        el.style.height = newHeight;
      });
    }
  }

  ta.addEventListener("input", function(evt){
    var ta = evt.target;
    var lineHeight = parseInt(ta.style.lineHeight, 10);

    if (ta.scrollHeight > ta.offsetHeight) {
      var newHeight =  ta.offsetHeight + lineHeight + "px";
      changeHeight(ta, newHeight);
    } else {
      var id = setInterval(function () {
        var height = parseInt(ta.style.height, 10);
        changeHeight(ta, height - lineHeight + "px");
        if (parseInt(initialHeight, 10) > ta.offsetHeight) {
          changeHeight(ta, initialHeight);
          clearInterval(id);
        } else if (ta.scrollHeight > ta.offsetHeight){
          var newHeight = ta.offsetHeight + lineHeight + "px";
          changeHeight(ta, newHeight);
          clearInterval(id);
        }
      }, 5);
    }
  });

  return {
    initialize: function () {
      changeHeight(ta, initialHeight);
    }
  }
}