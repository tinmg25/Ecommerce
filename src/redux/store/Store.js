import { createStore } from "redux";
import reducers from "../reducer/Reducers";
import reducers2 from "../reducer/Reducers2";
import { combineReducers } from "redux";

const routeReducer = combineReducers({reducers,reducers2});

const store = createStore(routeReducer);

export default store;