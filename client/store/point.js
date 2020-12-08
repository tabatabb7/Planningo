import axios from "axios";

const ADD_COMPLETED_POINTS = 'ADD_COMPLETED_POINTS'
const DELETE_POINTS = 'DELETE_POINTS'

const addCompletedPoints = pointEntry => ({
  type: ADD_COMPLETED_POINTS,
  pointEntry
})

const deletePoints = pointEntry => ({
  type: DELETE_POINTS,
  pointEntry
})

export const postCompletedPointsThunk = (taskId) => {
  console.log('INSIDE POINTS COMPLETE THUNK!')
  return async (dispatch) => {
    try {
      console.log("TASKID!!!! --->", taskId)
      const { data: pointEntry }= await axios.post(`/api/points/`, taskId)
      console.log('NEW POINT INSTANCE INSIDE THUNK--->', pointEntry)
      dispatch(addCompletedPoints(pointEntry))
    } catch (err) {
      console.error("There was a problem adding points!");
      console.error(err);
    }
  };
};

export const removeCompletedPointsThunk = (taskId) => {
  console.log('INSIDE POINTS COMPLETE THUNK!')
  return async (dispatch) => {
    try {
      console.log("TASKID!!!! --->", taskId)
      const { data: pointEntry }= await axios.delete(`/api/points/${taskId}`)
      console.log('NEW POINT INSTANCE INSIDE THUNK--->', pointEntry)
      dispatch(deletePoints(pointEntry))
    } catch (err) {
      console.error("There was a problem deleting points!");
      console.error(err);
    }
  };
};

const initialState = {}

export default function pointsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_COMPLETED_POINTS:
      return action.pointEntry
    case DELETE_POINTS:
      return action.pointEntry
    default:
      return state
  }
}
