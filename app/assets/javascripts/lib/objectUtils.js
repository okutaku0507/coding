var _ = require('underscore');
var changeCase = require('change-case');
var moment = require('moment');

var ObjectUtils = {

  deepClone: function (obj) {
    var deepClone = ObjectUtils.deepClone;
    var newObj = {}
    _.each(obj, function (v,k) {
      if (_.isArray(v)) {
        newObj[k] = _.map(v, function (el) {
          return deepClone(el);
        })
      } else if (_.isObject(v)) {
        newObj[k] = deepClone(v);
      } else {
        newObj[k] = v;
      }
    });
    return newObj;
  },

  objectSnakify: function (obj) {
    var objectSnakify = ObjectUtils.objectSnakify;
    var newObj = {}
    var snake = ObjectUtils.snakeCase;
    _.each(obj, function (v,k) {
      if (_.isArray(v)) {
        newObj[snake(k)] = _.map(v, function (el) {
          return objectSnakify(el);
        })
      } else if (_.isObject(v)) {
        newObj[snake(k)] = objectSnakify(v);
      } else {
        newObj[snake(k)] = v;
      }
    });
    return newObj;
  },

  snakeCase: function (str) {
    return changeCase.snakeCase(str);
  },

  formatMoment: function (obj) {
    var formatMoment = ObjectUtils.formatMoment;
    var newObj = {}
    _.each(obj, function (v,k) {
      if (_.isArray(v)) {
        newObj[k] = _.map(v, function (el) {
          return formatMoment(el);
        })
      } else if (moment.isMoment(v)) {
        newObj[k] = v.format();
      } else if (_.isObject(v)) {
        newObj[k] = formatMoment(v);
      } else {
        newObj[k] = v;
      }
    });
    return newObj;
  },
}

module.exports = ObjectUtils;
