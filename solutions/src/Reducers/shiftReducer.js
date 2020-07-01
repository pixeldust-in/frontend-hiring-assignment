import {
  GET_SHIFT_DETAILS,
  CANCEL_SHIFT,
  BOOk_SHIFT,
} from "../API/ActionTypes";

const shiftReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SHIFT_DETAILS:
      return { ...state, allshiftData: action.payload };
    case BOOk_SHIFT:
      return [
        ...state,
        {
          bookedShift: [],
        },
      ];
    case CANCEL_SHIFT:
      return [
        ...state,
        {
          cancelledShift: [],
        },
      ];
    default:
      return state;
  }
};
export default shiftReducer;
