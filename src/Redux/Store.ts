import { combineReducers, createStore } from "redux";
import { tasksReducer } from "./TasksAppState";
import { authReducer } from "./AuthAppState";
import { usersReducer } from "./UsersAppState";

const reducers = combineReducers({
  tasksReducer: tasksReducer,
  authReducer: authReducer,
  usersReducer: usersReducer,
});
const store = createStore(reducers);

export default store;
