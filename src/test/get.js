import tape from 'tape';
import {get} from '../get.js';

tape('get', function(t) {
  var a = {};
  t.equal(get(['b'], a), undefined, 'getting a property on empty object');
  t.equal(
    get('a.b.c'.split('.'), a),
    undefined,
    'getting deep property on empty object'
  );

  var b = {
    key: 'value',
  };
  t.equal(
    get(['key'], b),
    'value',
    'getting a property on shallow object with value'
  );
  t.equal(
    get(['key', 'value'], b),
    undefined,
    'getting a deep property on shallow object'
  );
  t.equal(
    get(['lol', 'key'], b),
    undefined,
    'getting a deep property on a shallow object'
  );

  var c = {
    deep: {
      obj: {
        val: 'value',
      },
    },
  };
  t.equal(
    get(['deep', 'obj', 'val'], c),
    'value',
    'getting a deep property on a deep object'
  );
  t.deepLooseEqual(
    get(['deep', 'obj'], c),
    {val: 'value'},
    'getting a less deep property on a deep object'
  );
  t.deepLooseEqual(
    get(['deep'], c),
    {obj: {val: 'value'}},
    'getting a shallow property on a deep object'
  );
  t.equal(
    get(['lol'], c),
    undefined,
    'getting a null shallow property on a deep object'
  );
  t.equal(
    get(['lol', 'lul'], c),
    undefined,
    'getting a null deep property on a deep object'
  );
  t.equal(
    get(['deep', 'obj', 'val', 'thing'], c),
    undefined,
    'getting a null deep property on a deep object'
  );
  t.end();
});
