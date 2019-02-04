import * as R from 'ramda';
import React, { Fragment, useState, useEffect } from 'react';
import { addRandomUser, addUserName, getGitFollowers } from './state/actions/users';
import { getFromState } from './state';
import './App.css';

const getTargetValue = R.path(['currentTarget', 'value']);

const UserPlusList = () => {
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState('');
  const addUser = () => {
    addRandomUser({
      id: userId,
      name: userName,
    });
    addUserName(userName);
    setUserId(userId + 1);
  };

  return (
    <Fragment>
      <input type="text" value={userName} onChange={R.compose(setUserName, getTargetValue)} />
      <button onClick={addUser}>Click to add user</button>
    </Fragment>
  );
}

const UsersFollowers = () => {
  const isFollowing = getFromState('followersLoading');
  const followers = getFromState('gitFollowers');
  const user = getFromState('user');

  return followers.length ? (
    <div>
      Followers of {user}:
      {isFollowing ? 
        <div>Loading...</div> :
        <ul>
          {followers.map(user => <li key={user.id}>{user.name}</li>)}
        </ul>
      }
    </div>
  ) : null;
};

const Wrapper = () => {
  const users = getFromState('users');
  return users.length ? (
    <div>Users list: 
      <ul>
        {users.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
    </div>
  ) : null;
};

const SomeChild = ({ userName }) => {
  const user = getFromState('user');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (user) {
      setIsVisible(true);
      getGitFollowers(user);
    }
  }, [user]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    }
  }, [user]);

  return isVisible ? <div>{user} was added</div> : null;
};

export const App = () => {
  return (
    <Fragment>
      <SomeChild />
      <UserPlusList />
      <Wrapper />
      <UsersFollowers />
    </Fragment>
  );
};
