import axios from "axios";

/**
 * ACTION TYPES
 */
const GET_TASKS = "GET_TASKS";
const ADD_TASK = "ADD_TASK";
const DELETE_TASK = "DELETE_TASK";

const UPDATE_TASK = 'UPDATE_TASK'

const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER"


/**
 * INITIAL STATE
 */

const initialState = {};

/**
 * ACTION CREATORS
 */

const getTasks = (tasks) => ({ type: GET_TASKS, tasks });
const addTask = (task) => ({ type: ADD_TASK, task });
const deleteTask = (taskId) => ({ type: DELETE_TASK, taskId });
const updateTask = task => ({ type: UPDATE_TASK, task })

/**
 * THUNK CREATORS
 */

export const fetchTasksThunk = () => async (dispatch) => {
  try {
    const { data: tasks } = await axios.get(`/api/tasks`);
    dispatch(getTasks(tasks));
  } catch (error) {
    console.log("error fetching tasks");
  }
};

export const addTaskThunk = (task) => async (dispatch) => {
  try {
    // console.log(task)
    const { data: newTask } = await axios.post("/api/tasks", task);
    dispatch(addTask(newTask));
  } catch (error) {
    console.error("Error adding task!");
    console.error(error);
  }
};

export const removeTaskThunk = (taskId) => async (dispatch) => {
  try {
    await axios.delete(`/api/tasks/${taskId}`);
    dispatch(deleteTask(taskId));
  } catch (error) {
    console.error("Error deleting task!");
    console.error(error);
  }
};

export const updateTaskThunk = (task) => async (dispatch) => {
  try {
    const { data: updatedTask } = await axios.put(`/api/tasks/`, task)
    dispatch(updateTask(updatedTask))
  } catch (error) {
    console.error('Error updating task!')
    console.error(error)
  }
}

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return action.tasks
    case ADD_TASK:
      return {...state, ...action.task};
    case DELETE_TASK:
      return {...state}
    case UPDATE_TASK:
      return {...state, tasks: state.tasks.map((task) => {
        if (task.id === action.task.id) return action.task
        else return task
      })}
    default:
      return state;
  }
}
