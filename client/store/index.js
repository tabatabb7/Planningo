import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "./user";
import tasks from "./tasks";
import singleTask from "./singletask";
import groceries from "./groceries";
import groups from "./allGroups";
import singleGroup from "./singleGroup";
import groupGroceries from "./groupGroceries";

const reducer = combineReducers({
  user,
  singleTask,
  tasks,
  groceries,
  groups,
  singleGroup,
  groupGroceries,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./user";
