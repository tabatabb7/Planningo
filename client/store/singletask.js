import axios from 'axios'

// intialState
const initialState = {}

// action constants
const GET_TASK = 'GET_TASK'
const UPDATE_TASK = 'UPDATE_TASK'

const getTask = task => ({ type: GET_SINGLE_TASK, task })
const updateTask = task => ({ type: UPDATE_TASK, task })

// thunk creators
export const fetchTaskThunk = taskId => async dispatch => {
  try {
    const { data: task } = await axios.get(`/api/tasks/${taskId}`)
    dispatch(getTask(task))
  } catch (error) {
    console.error('Error fetching task!')
    console.error(error)
  }
}

export const updateSingleTask = task => async dispatch => {
  try {
    const { data: updatedTask } = await axios.put(`/api/tasks/${task.taskId}`, task)
    dispatch(updateTask(updatedTask))
  } catch (error) {
    console.error('Error updating task!')
    console.error(error)
  }
}



export default function singleTaskReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASK:
      return { ...state, ...action.task }
    case UPDATE_TASK:
      return { ...state, ...action.task }
    default:
      return state
  }
}
