import { combineReducers } from "redux";
import { groupBy, sortBookedList } from "./function";
import { GET_AVAILABLE_SHIFTS } from "./action";
import { GET_MY_SHIFTS } from "./action";

const defaultShifts = {};
const defaultMyShifts = [];

function myShifts(state = defaultMyShifts, action) {
  switch (action.type) {
    case GET_MY_SHIFTS:
      const sortedList = sortBookedList(action.data);

      return sortedList;
    default:
      return state;
  }
}

function availableShifts(state = defaultShifts, action) {
  switch (action.type) {
    case GET_AVAILABLE_SHIFTS:
      const group = groupBy(action.data, "area");

      return group;
    default:
      return state;
  }
}

const shiftApp = combineReducers({
  availableShifts,
  myShifts,
});

export default shiftApp;
