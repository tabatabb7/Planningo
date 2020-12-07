import axios from "axios";

/**
 * ACTION TYPES
 */
const GET_TASK = "GET_TASK";
const GET_TASKS = "GET_TASKS";
const ADD_TASK = "ADD_TASK";
const DELETE_TASK = "DELETE_TASK";

/**
 * INITIAL STATE
 */

const initialState = {};

/**
 * ACTION CREATORS
 */

const getTask = (task) => ({ type: GET_TASK, task });
const getTasks = (tasks) => ({ type: GET_TASKS, tasks });
const addTask = (task) => ({ type: ADD_TASK, task });
const deleteTask = (taskId) => ({ type: DELETE_TASK, taskId });


/**
 * THUNK CREATORS
 */

export const fetchTaskThunk = (taskName) => async (dispatch) => {
  try {
    const { data: users } = await axios.get(`/api/tasks`);
    // console.log(users)
    const tasks = users.tasks
    console.log(tasks)
    const task = tasks.filter((task) => task.name === taskName)

    dispatch(getTask(task));
  } catch (error) {
    console.log("error fetching tasks");
  }
};

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
    console.log(task)
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

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASK:
      // this is the array of task objects 
      console.log('TASKS ARRAY' , action.task)
      return action.task
    case GET_TASKS:
      return action.tasks
    case ADD_TASK:
      return {...state, ...action.task};
    case DELETE_TASK:
      return {...state}
    default:
      return state;
  }
}
