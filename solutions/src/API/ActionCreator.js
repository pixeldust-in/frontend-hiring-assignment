import axios from "axios";
import * as ActionTypes from "./ActionTypes";

const axiosCall = axios.create({ baseURL: "http://127.0.0.1:8080/" });

const data = (actionType, data) => ({
  type: actionType,
  payload: data,
});

export const getShiftDetails = (callback) => {
  return (dispatch) => {
    axiosCall
      .get(`shifts`)
      .then((response) => {
        dispatch(data(ActionTypes.GET_SHIFT_DETAILS, response.data));
        callback();
      })
      .catch((error) => {
        dispatch(data(ActionTypes.ERROR_SHIFT, error));
        callback();
      });
  };
};
export const bookShift = (shiftId) => {
  return (dispatch) => {
    axiosCall
      .post(`shifts/${shiftId}/book`)
      .then((response) => {
        dispatch(data(ActionTypes.BOOk_SHIFT, response.data));
      })
      .catch((error) => {
        dispatch(data(ActionTypes.ERROR_SHIFT, error));
      });
  };
};
export const cancelShift = (shiftId) => {
  return (dispatch) => {
    axiosCall
      .post(`shifts/${shiftId}/cancel`)
      .then((response) => {
        dispatch(data(ActionTypes.CANCEL_SHIFT, response.data));
      })
      .catch((error) => {
        dispatch(data(ActionTypes.ERROR_SHIFT, error));
      });
  };
};
