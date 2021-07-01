export const GET_AVAILABLE_SHIFTS = "GET_AVAILABLE_SHIFTS";
export const GET_MY_SHIFTS = "GET_MY_SHIFTS";

function getAvailableShiftsSuccess(data) {
  return {
    type: GET_AVAILABLE_SHIFTS,
    data,
  };
}

function getMyShiftsSuccess(data) {
  return {
    type: GET_MY_SHIFTS,
    data,
  };
}

export function getAvailableShifts() {
  return function (dispatch) {
    fetch("http://127.0.0.1:8080/shifts")
      .then((res) => res.json())
      .then((data) => {
        dispatch(getAvailableShiftsSuccess(data));
      });
  };
}

export function getMyShifts() {
  return function (dispatch) {
    fetch("http://127.0.0.1:8080/shifts")
      .then((res) => res.json())
      .then((data) => {
        dispatch(getMyShiftsSuccess(data));
      });
  };
}

export function bookShift(id) {
  return function (dispatch) {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    fetch(`http://127.0.0.1:8080/shifts/${id}/book`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(getAvailableShifts());
      })
      .catch((err) => console.log(err));
  };
}

export function cancelShift(id) {
  return function (dispatch) {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    fetch(`http://127.0.0.1:8080/shifts/${id}/cancel`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(getAvailableShifts());
        dispatch(getMyShifts());
      })
      .catch((err) => console.log(err));
  };
}
