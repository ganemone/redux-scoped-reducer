# redux-scoped-reducer

[![build status](https://travis-ci.org/ganemone/redux-scoped-reducer.svg?branch=master)](https://travis-ci.org/ganemone/redux-scoped-reducer)
[![npm version](https://img.shields.io/npm/v/redux-scoped-reducer.svg)](https://www.npmjs.com/package/redux-scoped-reducer)

## Quickstart

### Install the library
```sh
$ npm install redux-scoped-reducer --save
```

### Basic Usage

```js
// Import the library
import createReducerScope from 'redux-scoped-reducer';
// Create the reducer scoper
const createViewsReducer = createReducerScope('user.views');

// Some view reducer
function viewReducer(state, action) {
  // state here will be scoped to `user.views`
  if (action.type === 'INCREMENT_VIEWS') {
    return {
      ...state,
      viewCount: state.viewCount + 1,
    };
  }
  return state;
}

// Scope the viewReducer function
const scopedViewReducer = reducerScope(viewReducer);

const state = {
  user: {
    views: {
      viewCount: 0,
    }
  },
  // ... other pieces of state
};
const action = {type: 'INCREMENT_VIEWS'};
const nextState = scopedViewReducer(state, action);
// {
//   user: {
//     views: {
//       viewCount: 1,
//     }
//   }
// }
```

### API
```flow
import createReducerScope from 'redux-scoped-reducer';

// scope can be dot separated to allow for deep path scoping.
// Examples: 'user', 'user.views', 'user.views.viewCount', ...etc
type createReducerScope = (scope: string) => ReducerCreator;

type ReducerCreator = (Reducer) => Reducer;

// Standard redux reducers and actions.
// Type definitions included for completeness, but nothing special going on here
type Reducer = (state: any, action: Action) => any;
type Action = {
  type: string,
  payload: any,
};
```

### More Usage Examples
```js
import createReducerScope from 'redux-scoped-reducer';
// The scoped reducer pattern works nicely with the `reduce-reducers` library
import reduceReducers from 'reduce-reducers';

const createViewsReducer = createReducerScope('user.views');
const createCounterReducer = createReducerScope('counter');

function viewReducer(state, action) {
  if (action.type === 'INCREMENT_VIEWS') {
    return {
      ...state,
      viewCount: state.viewCount + 1,
    };
  }
  return state;
}

function counterReducer(state, action) {
  if (action.type === 'INCREMENT_COUNTER') {
    return state + 1;
  }
  return state;
}

const scopedViewReducer = createViewsReducer(viewReducer);
const scopedCounterReducer = createCounterReducer(counterReducer);
// scoped reducers can be easily composed using reduce reducers
const rootReducer = reduceReducers(scopedViewReducer, scopedCounterReducer);

let lastState = {
  user: {
    views: {
      viewCount: 0,
    },
    meta: {
      firstName: 'hello',
      lastName: 'world',
    }
  },
  counter: 0,
};

const incrementCounterAction = {type: 'INCREMENT_COUNTER'};
const incrementViewCountAction = {type: 'INCREMENT_VIEWS'};

let nextState = rootReducer(lastState, incrementCounterAction);

// Reference equality at root will be broken
nextState !== lastState

// Reference equality is maintained outside of the changed path
nextState.user === lastState.user

lastState = nextState;
nextState = rootReducer(nextState, incrementViewCountAction);

// Reference equality at root will be broken
nextState !== lastState

// Reference equality is broken within the changed property path
nextState.user !== lastState.user
nextState.user.views !== lastState.user.views

// Reference equality is maintained outside the changed property path,
// even at properties adjacent to ones in the changed path
nextState.user.meta === lastState.user.meta

```

