import axios from 'axios';
import history from '../history';

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
export const me = () => async (dispatch) => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (
  email,
  password,
  method,
  firstName,
  lastName
) => async dispatch => {
  try {
    res = await axios.post(`/auth/${method}`, {
      email,
      password,
      name,
      firstName,
      lastName,
    })
    history.push('/home')
  } catch (authError) {
    return dispatch(getUser({error: authError}))
}
}

export const updateUserThunk = (user) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.put(`/api/users/${user.id}`, user);
      dispatch(getUser(data));
    } catch (error) {
      console.log('error editing user info');
    }
  };
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post('/auth/logout');
    dispatch(removeUser());
    history.push('/login');
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case ADD_USER:
      return [...state, action.user];
    default:
      return state;
  }
}
