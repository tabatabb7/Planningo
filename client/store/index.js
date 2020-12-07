import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "./user";
import tasks from "./tasks";
import singleTask from "./singletask";
import singleItem from "./singleItem";
import groups from "./allGroups";
import singleGroup from "./singleGroup";
import items from "./items";

const reducer = combineReducers({
  user,
  singleTask,
  tasks,
  groups,
  singleGroup,
  singleItem,
  items
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./user";
