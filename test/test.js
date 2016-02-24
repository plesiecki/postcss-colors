import postcss from 'postcss';
import test from 'ava';
import 'babel-register';
import colors from '../src/';

const run = (t, input, output) => t.same(postcss(colors).process(input).css, output);

test('test', t => run(t, '@colors{foo:black}.bar{color:foo}', '.bar{color:black}'));
