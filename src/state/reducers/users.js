import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import { addUser, removeUser, enterUser, saveAllFollowers, setFollowersLoading } from '../actions/users';

export const users = handleActions({
  [addUser]: (state, { payload }) => state.concat(payload),
  [removeUser]: (state, { payload }) => state.filter(R.propEq('id', payload)),
}, []);

export const user = handleActions({
  [enterUser]: (_, { payload }) => payload,
}, null);

export const gitFollowers = handleActions({
  [saveAllFollowers]: (_, { payload }) => payload,
}, []);

export const followersLoading = handleActions({
  [setFollowersLoading]: () => true,
  [saveAllFollowers]: () => false,
}, false);
