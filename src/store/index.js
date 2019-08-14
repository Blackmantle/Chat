import React from 'react';
import useGlobalHook from 'use-global-hook';
import actions from '../actions';

const initialState = {
  userName: localStorage.getItem('username') || '',
};

export default useGlobalHook(React, initialState, actions);
