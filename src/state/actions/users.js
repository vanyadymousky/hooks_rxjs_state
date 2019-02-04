import { createActions } from 'redux-actions';
// import { ajax } from 'rxjs/ajax';
import { timer } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { actionDispatcher } from '.';

export const {
  addUser,
  removeUser,
  enterUser,
  saveAllFollowers,
  setFollowersLoading,
} = createActions(
  'ADD_USER',
  'REMOVE_USER',
  'ENTER_USER',
  'SAVE_ALL_FOLLOWERS',
  'SET_FOLLOWERS_LOADING',
);

// Example action function
export const addRandomUser = actionDispatcher(addUser);

export const addUserName = actionDispatcher(enterUser);

export const getGitFollowers = actionDispatcher((name) => timer(1000).pipe(
  // Fake ajax request
  map(() => [
    {
      id: 1,
      name: 'Bob',
    },
    {
      id: 2,
      name: 'Caroline',
    },
  ]), 
  map(saveAllFollowers),
  startWith(setFollowersLoading()),
));
