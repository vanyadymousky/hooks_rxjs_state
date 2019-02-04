import { Subject } from 'rxjs';

// create our stream as a subject so arbitrary data can be sent on the stream
export const action$ = new Subject();

// Higher order function to send actions to the stream
export const actionDispatcher = (func) => (...args) =>  
  action$.next(func(...args));
