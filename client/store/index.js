import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "./user";
import tasks from "./tasks";
import singletask from "./singletask";
import groceries from "./groceries";
import groups from "./allGroups";

const reducer = combineReducers({
  user,
  singletask,
  tasks,
  groceries,
  groups,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./user";
