import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { store$, StateContext } from './state';
import './index.css';

store$.subscribe(state => ReactDOM.render(
  <StateContext.Provider value={state}>
    <App />
  </StateContext.Provider>, 
  document.getElementById('root'),
));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
