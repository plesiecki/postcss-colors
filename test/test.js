import postcss from 'postcss';
import test from 'ava';
import 'babel-register';
import colors from '../src/';

const run = (t, input, output) => t.same(postcss(colors).process(input).css, output);

test('single palette', t => run(t,
    '@colors{foo:black;bar:white}.baz{color:foo;background-color:bar}',
    '.baz{color:black;background-color:white}'
));

test('multiple palette', t => run(t,
    '@colors palette {foo:black;bar:white}@colors {link-color:bar}.baz{background-color:foo;color:link-color}',
    '.baz{background-color:black;color:white}'
));
