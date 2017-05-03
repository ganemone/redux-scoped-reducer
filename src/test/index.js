import './get.js';
import './set.js';
import tape from 'tape';
import createReducerScope from '../index.js';

tape('createReducerScope single property scope', function(t) {
  var scope = createReducerScope('user');
  var initialState = {};
  function userReducer(state, action) {
    t.equal(action, 'TEST', 'passes action through correctly');
    state = state || {};
    return Object.assign({}, state, {
      firstName: 'First',
      lastName: 'Last',
    });
  }
  var scopedReducer = scope(userReducer);
  t.deepLooseEqual(
    scopedReducer(initialState, 'TEST'),
    {
      user: {
        firstName: 'First',
        lastName: 'Last',
      },
    },
    'sets properties on state with null key correctly'
  );
  t.end();
});

tape('createReducerScope single property scope with existing props', function(
  t
) {
  var scope = createReducerScope('user');
  var initialState = {
    user: {
      firstName: 'lol',
    },
  };
  function userReducer(state, action) {
    t.deepLooseEqual(
      state,
      {
        firstName: 'lol',
      },
      'scopes the state properly'
    );
    t.equal(action, 'TEST', 'passes action through correctly');
    state = state || {};
    return Object.assign({}, state, {
      firstName: 'First',
      lastName: 'Last',
    });
  }
  var scopedReducer = scope(userReducer);
  t.deepLooseEqual(
    scopedReducer(initialState, 'TEST'),
    {
      user: {
        firstName: 'First',
        lastName: 'Last',
      },
    },
    'sets properties on state with existing props correctly'
  );
  t.end();
});

tape('createReducerScope multiple property scope', function(t) {
  var scope = createReducerScope('user.data.user');
  var initialState = {};
  function userReducer(state, action) {
    t.equal(action, 'TEST', 'passes action through correctly');
    state = state || {};
    return Object.assign({}, state, {
      firstName: 'First',
      lastName: 'Last',
    });
  }
  var scopedReducer = scope(userReducer);
  var result = scopedReducer(initialState, 'TEST');
  t.deepLooseEqual(
    result.user.data,
    {
      user: {
        firstName: 'First',
        lastName: 'Last',
      },
    },
    'sets properties on state with null key correctly'
  );
  t.end();
});

tape('createReducerScope multiple property scope with null early', function(t) {
  t.end();
});
