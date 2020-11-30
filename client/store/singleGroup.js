import axios from "axios";

//ACTIONS
const SET_SINGLE_GROUP = "SET_SINGLE_GROUP";

//ACTION CREATORS

export const setSingleGroup = (group) => {
  return {
    type: SET_SINGLE_GROUP,
    group,
  };
};

//THUNK CREATORS
export const fetchSingleGroup = (groupId) => {
  return async (dispatch) => {
    try {
      const { data: group } = await axios.get(`/api/groups/${groupId}`);
      dispatch(setSingleGroup(group));
    } catch (err) {
      console.error("There was a problem fetching this group!");
      console.error(err);
    }
  };
};


//update group info
export const updateGroupThunk = (group) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/groups/${group.id}`, group);
      dispatch(setSingleGroup(data));
    } catch (error) {
      console.log("error updating group");
    }
  };
};

//add user to group
export const addToGroupThunk = (groupId, userId) => {
  return async (dispatch) => {
    try {
      const { data: updatedGroup } = await axios.post(
        `/api/groups/${groupId}/${userId}`,
        {
          userId,
        }
      );
      dispatch(receiveGroup(updatedGroup));
    } catch (err) {
      console.log(err);
    }
  };
};

//remove user from group
export const deleteFromGroupThunk = (groupId, userId) => {
  return async (dispatch) => {
    try {
      const { data: updatedGroup } = await axios.delete(
        `/api/groups/${groupId}/${userId}`
      );
      dispatch(receiveGroup(updatedGroup));
    } catch (err) {
      console.log(err);
    }
  };
};

//INITIAL STATE
const initialState = {};

//REDUCER

const singleGroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_GROUP:
      return action.group;
    default:
      return state;
  }
};

export default singleGroupReducer;
