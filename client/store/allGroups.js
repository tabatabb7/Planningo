import axios from "axios";

// ACTIONS
const SET_ALL_GROUPS = "SET_ALL_GROUPS";
const CREATE_GROUP = "CREATE_GROUP";
const DELETE_GROUP = "DELETE_GROUP";

// ACTION CREATORS
export const setAllGroups = (groups) => ({
  type: SET_ALL_GROUPS,
  groups,
});

export const createGroup = (group) => ({
  type: CREATE_GROUP,
  group,
});

export const deleteGroup = (id) => ({
  type: DELETE_GROUP,
  id,
});

// THUNK CREATORS

//get a user's groups
export const fetchGroupThunk = () => {
  return async (dispatch) => {
    try {
      const { data: groups } = await axios.get(`/api/${userId}/groups`);
      dispatch(setAllGroups(groups));
    } catch (err) {
      console.log(err);
    }
  };
};

//create a group
export const createGroupThunk = (group) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.post(`/api/groups`, group);
      dispatch(createGroup(data));
    } catch (error) {
      console.log('error creating group', group);
    }
  };
};

//delete a group
export const deleteGroupThunk = (id) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.delete(`/api/groups/{id}`);
      dispatch(deleteGroup(data));
    } catch (error) {
      console.log(`error deleting group with id ${id}`, error);
    }
  };
};



// REDUCER
const initialState = {};

export default function groupReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_GROUPS:
      return action.groups;
    case CREATE_GROUP:
      return [...state, action.group];
    case DELETE_GROUP:
      return [...state]
    default:
      return state;
  }
}
