import { combineReducers } from 'redux';
import { users, user, gitFollowers, followersLoading } from './users';

export default combineReducers({
  users,
  user,
  gitFollowers,
  followersLoading,
});
