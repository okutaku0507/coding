var React = require('react');

var cancelScrollEvent = function (e) {
  e.stopImmediatePropagation();
  e.preventDefault();
  e.returnValue = false;
  return false;
};

var addScrollEventListener = function (elem, handler) {
  elem.addEventListener('wheel', handler, false);
};

var removeScrollEventListener = function (elem, handler) {
  elem.removeEventListener('wheel', handler, false);
};

var ScrollLockMixin = {
  scrollLock: function (elem) {
    elem = elem || React.findDOMNode(this);
    this.scrollElem = elem;
    addScrollEventListener(elem, this.onScrollHandler);
  },

  scrollRelease: function (elem) {
    elem = elem || this.scrollElem;
    removeScrollEventListener(elem, this.onScrollHandler);
  },

  onScrollHandler: function (e) {
    var elem = this.scrollElem;
    var scrollTop = elem.scrollTop;
    var scrollHeight = elem.scrollHeight;
    var height = elem.clientHeight;
    var wheelDelta = e.deltaY;
    var isDeltaPositive = wheelDelta > 0;

    if (isDeltaPositive && wheelDelta > scrollHeight - height - scrollTop) {
      elem.scrollTop = scrollHeight;
      return cancelScrollEvent(e);
    }
    else if (!isDeltaPositive && -wheelDelta > scrollTop) {
      elem.scrollTop = 0;
      return cancelScrollEvent(e);
    }
  }
};

module.exports = ScrollLockMixin;
