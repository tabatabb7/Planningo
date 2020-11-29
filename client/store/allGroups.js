import axios from "axios";

/**
 * ACTION TYPES
 */

const GET_GROUPS = "GET_GROUPS";
const ADD_GROUP = "ADD_GROUP";
const DELETE_GROUP = "DELETE_GROUP";

/**
 * INITIAL STATE
 */

const initialState = [];

/**
 * ACTION CREATORS
 */
const getGroups = (groups) => ({ type: GET_GROUPS, groups });
const addGroup = (group) => ({ type: ADD_GROUP, group });
const deleteGroup = (groupId) => ({ type: DELETE_GROUP, groupId });

/**
 * THUNK CREATORS
 */

export const fetchGroupsThunk = () => async (dispatch) => {
  try {
    console.log("inside thunks");
    const { data: groups } = await axios.get(`/api/groups`);
    console.log(groups, "groups inside thunks");
    dispatch(getGroups(groups));
  } catch (error) {
    console.log("error fetching groups");
  }
};

export const addGroupThunk = (group) => async (dispatch) => {
  try {
    const { data: newGroup } = await axios.post("/api/groups", group);
    dispatch(addGroup(newGroup));
  } catch (error) {
    console.error("Error adding group!");
    console.error(error);
  }
};

export const removeGroupThunk = (groupId) => async (dispatch) => {
  try {
    await axios.delete(`/api/groups/${groupId}`);
    dispatch(deleteGroup(groupId));
  } catch (error) {
    console.error("Error deleting group!");
    console.error(error);
  }
};

export default function groupsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GROUPS:
      return action.groups;
    case ADD_GROUP:
      return [...state, action.group];
    case DELETE_GROUP:
      return [...state];
    default:
      return state;
  }
}
