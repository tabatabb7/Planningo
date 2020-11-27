import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const ADD_USER = 'ADD_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = (user) => ({type: GET_USER, user});
const removeUser = () => ({type: REMOVE_USER});
const addUser = (user) => ({type: ADD_USER, user});

/**
 * THUNK CREATORS
 */