import * as R from 'ramda';
import { createContext, useContext } from 'react';
import { Observable, from } from 'rxjs';
import { startWith, scan, tap, mergeMap } from 'rxjs/operators';
import reducer from './reducers';
import { action$ } from './actions';
import { createStore } from 'redux';
const store = createStore(reducer);

/**
 * Create store of having actions stream make state reduced with reducers
 */
export const store$ = action$.pipe(
  startWith(store.getState()),
  mergeMap(action => {
    console.log('action in merge map', action, action instanceof Observable);
    return action instanceof Observable ? action : from([action]);
  }),
  tap((action) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('action: ', action);
    }    
  }),
  scan(reducer),
  tap((val) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('state after: ', val);
    }    
  }),
);

export const StateContext = createContext(null);

export const getFromState = subject => R.path(
  subject.split('.'), 
  useContext(StateContext)
);
