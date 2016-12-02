import postcss from 'postcss';
import helpers from 'postcss-message-helpers';

const PROPS = [
    'color',
    'background',
    'background-color',
    'border',
    'border-color',
    'outline',
    'outline-color',
    'text-shadow',
    'box-shadow',
    'fill'
];

const replace = (value, args) => value.replace(...args);

module.exports = postcss.plugin('postcss-colors', () => {
    return css => {
        const palette = {};
        const transforms = [];

        css.walkAtRules('colors', rule => {
            rule.nodes.forEach(color => palette[color.prop] = color.value);
            rule.remove();
        });

        const keywords = Object.keys(palette);
        const KEYWORD_REGEX = new RegExp(`\\b(${keywords.join('|')})\\b`);
        keywords.forEach(keyword => {
            if (palette.hasOwnProperty(keyword) && palette[keyword]) {
                transforms.push([
                    new RegExp(`\\b(${keyword})(\\s*([^(]|$))`, 'gi'),
                    `${palette[keyword]}$2`
                ]);
            }
        });

        transforms.reverse();

        css.walkDecls(decl => {
            if (!PROPS.includes(decl.prop) || !decl.value || !KEYWORD_REGEX.test(decl.value)) {
                return;
            }
            decl.value = helpers.try(() => transforms.reduce(replace, decl.value), decl.source);
        });
    };
});
