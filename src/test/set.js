import {set, cloneOnPath} from '../set.js';
import tape from 'tape';

tape('set', function(t) {
  var a = {};
  var next = set(['data'], a, {key: 'value'});
  t.deepLooseEqual(
    next,
    {
      data: {
        key: 'value',
      },
    },
    'setting a property on an empty object'
  );

  var data = {
    a: {
      b: {
        c: 'value',
      },
      d: {
        e: 'other',
      },
    },
    f: {
      g: 'h',
      i: 'j',
    },
  };
  next = set(['a', 'b', 'c'], data, 'something');
  t.equal(next.a.b.c, 'something', 'updates a deep value correctly');
  t.equal(data.a.b.c, 'value', 'does not modify the original value');
  t.equal(
    next.a.d,
    data.a.d,
    'maintains reference equality outside of the set path'
  );
  t.notEqual(next.a, data.a, 'breaks reference equality inside the set path');
  t.notEqual(next, data, 'breaks reference at the root path');
  t.equal(
    next.f,
    data.f,
    'maintains reference equality outside of the set path'
  );
  t.end();
});

tape('cloneOnPath', function(t) {
  var data = {
    a: {
      b: {
        c: 'value',
      },
      d: {
        e: 'other',
      },
    },
    f: {
      g: 'h',
      i: 'j',
    },
  };
  var partialClone = cloneOnPath(['a', 'b'], data);
  t.deepLooseEqual(partialClone, data, 'does not change the data');
  t.notEqual(partialClone, data, 'breaks reference equality at the root');
  t.equal(
    partialClone.f,
    data.f,
    'maintains reference equality outside of the clone path'
  );
  t.equal(
    partialClone.a.d,
    data.a.d,
    'maintains reference equality outside of the clone path'
  );
  t.notEqual(
    partialClone.a,
    data.a,
    'breaks reference equality inside the clone path'
  );

  partialClone = cloneOnPath(['empty', 'empty', 'empty'], data);
  t.deepLooseEqual(partialClone, data, 'does not change the data');
  t.notEqual(partialClone, data, 'breaks reference equality at the root');
  t.equal(
    partialClone.a,
    data.a,
    'maintains reference equality outside of the clone path'
  );
  t.notEqual(
    partialClone.empty,
    data.empty,
    'breaks reference equality inside the clone path'
  );
  t.end();
});
