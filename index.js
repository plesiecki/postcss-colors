'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssMessageHelpers = require('postcss-message-helpers');

var _postcssMessageHelpers2 = _interopRequireDefault(_postcssMessageHelpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var palette = {};
var transforms = [];

var PROPS = ['color', 'background', 'background-color', 'border', 'border-color', 'outline', 'outline-color', 'text-shadow', 'box-shadow'];

var replace = function replace(value, args) {
    return value.replace.apply(value, _toConsumableArray(args));
};

exports.default = _postcss2.default.plugin('postcss-colors', function () {
    return function (css) {
        css.walkAtRules('colors', function (rule) {
            rule.nodes.forEach(function (color) {
                return palette[color.prop] = color.value;
            });
            rule.remove();
        });

        var keywords = Object.keys(palette);
        var KEYWORD_REGEX = new RegExp('\\b(' + keywords.join('|') + ')\\b');
        keywords.forEach(function (keyword) {
            if (palette.hasOwnProperty(keyword) && palette[keyword]) {
                transforms.push([new RegExp('\\b(' + keyword + ')(\\s*([^(]|$))', 'gi'), palette[keyword] + '$2']);
            }
        });

        css.walkDecls('color', function (decl) {
            if (!(PROPS.indexOf(decl.prop) !== -1) || !decl.value || !KEYWORD_REGEX.test(decl.value)) {
                return;
            }
            decl.value = _postcssMessageHelpers2.default.try(function () {
                return transforms.reduce(replace, decl.value);
            }, decl.source);
        });
    };
});
