import axios from "axios";

const GET_USER_POINTS = "GET_USER_POINTS";
const GET_GROUP_POINTS = "GET_GROUP_POINTS";
const GET_USERGROUP_POINTS = "GET_USERGROUP_POINTS";
const ADD_COMPLETED_POINTS = "ADD_COMPLETED_POINTS";
const DELETE_POINTS = "DELETE_POINTS";

const fetchUserPoints = (points) => ({
  type: GET_USER_POINTS,
  points,
});
const fetchGroupPoints = (points) => ({
  type: GET_GROUP_POINTS,
  points,
});
const fetchUserGroupPoints = (points) => ({
  type: GET_USERGROUP_POINTS,
  points,
});
const addCompletedPoints = (pointEntry) => ({
  type: ADD_COMPLETED_POINTS,
  pointEntry,
});

const deletePoints = (pointEntry) => ({
  type: DELETE_POINTS,
  pointEntry,
});

export const fetchUserPointsThunk = (userId) => {
  return async (dispatch) => {
    try {
      console.log(userId, "userId inside thunks");
      const { data: userPoints } = await axios.get(
        `/api/points/${userId}`,
        userId
      );
      console.log(userPoints, "userPoints inside thunk");
      dispatch(fetchUserPoints(userPoints));
    } catch (error) {
      console.error("there was an error fetching your points");
    }
  };
};
//GET api/groups/:groupId/rewards
export const fetchGroupPointsThunk = (groupId) => {
  return async (dispatch) => {
    try {
      const groupPoints = await axios.get(
        `/api/groups/${groupId}/rewards`,
        groupId
      );
      dispatch(fetchGroupPoints(groupPoints));
    } catch (error) {
      console.error("there was an error fetching group points!");
    }
  };
};
//GET api/groups/:groupId/:userId/rewards
export const fetchUserGroupPointsThunk = (userId, groupId) => {
  return async (dispatch) => {
    try {
      const userGroupPoints = await axios.get(
        `/api/groups/${groupId}/${userId}/rewards`
      );
      dispatch(fetchUserGroupPoints(userGroupPoints));
    } catch (error) {
      console.error("there was an error fetching group points for this user");
    }
  };
};

export const postCompletedPointsThunk = (taskId) => {
  console.log("INSIDE POINTS COMPLETE THUNK!");
  return async (dispatch) => {
    try {
      console.log("TASKID!!!! --->", taskId);
      const { data: pointEntry } = await axios.post(`/api/points/`, taskId);
      console.log("NEW POINT INSTANCE INSIDE THUNK--->", pointEntry);
      dispatch(addCompletedPoints(pointEntry));
    } catch (err) {
      console.error("There was a problem adding points!");
      console.error(err);
    }
  };
};

export const removeCompletedPointsThunk = (taskId) => {
  console.log("INSIDE POINTS COMPLETE THUNK!");
  return async (dispatch) => {
    try {
      console.log("TASKID!!!! --->", taskId);
      const { data: pointEntry } = await axios.delete(`/api/points/${taskId}`);
      console.log("NEW POINT INSTANCE INSIDE THUNK--->", pointEntry);
      dispatch(deletePoints(pointEntry));
    } catch (err) {
      console.error("There was a problem deleting points!");
      console.error(err);
    }
  };
};

const initialState = {};

export default function pointsReducer(state = initialState, action) {
  console.log(action.points, "action.points inside the reducer");

  switch (action.type) {
    case ADD_COMPLETED_POINTS:
      return action.pointEntry;
    case DELETE_POINTS:
      return action.pointEntry;
    case GET_USER_POINTS:
      const allPoints = action.points.reduce((accum, point) => {
        return accum + point.value;
      }, 0);
      return allPoints;
    case GET_GROUP_POINTS:
      return action.points;
    case GET_USERGROUP_POINTS:
      return action.points;
    default:
      return state;
  }
}
