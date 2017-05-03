import {get} from './get.js';
import {set} from './set.js';
export function createReducerScope(scope) {
  var keys = scope.split('.');
  return function createScopedReducer(reducer) {
    return function scopedReducer(rootState, action) {
      rootState = rootState || {};
      var scopedState = get(keys, rootState);
      var newScopedState = reducer(scopedState, action);
      // maintain reference equality when nothing changed
      if (scopedState === newScopedState) {
        return rootState;
      }
      const nextState = set(keys, rootState, newScopedState);
      return nextState;
    }
  }
}

