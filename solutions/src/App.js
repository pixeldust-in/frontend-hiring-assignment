import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import * as ActionCreater from "./API/ActionCreator";

import MainComponent from "./Components/MainComponent";
import Spinner from "./Components/Generic/Spinner";

import "./App.css";
export const ShiftContext = React.createContext(null);

const App = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  let contextData = {
    shiftList: props.shiftList,
    myShifts:
      props.shiftList && props.shiftList.filter((shift) => shift.booked),
    location: [
      ...new Set(
        props.shiftList &&
          props.shiftList.map((data) => {
            return data.area;
          })
      ),
    ],
  };
  useEffect(() => {
    setIsLoading(true);
    props.getShiftDetails(() => setIsLoading(false));
  }, []);
  let helperFunction = () => {
    return isLoading ? (
      <Spinner message={"Loading App..."} />
    ) : (
      <ShiftContext.Provider value={contextData}>
        <MainComponent />
      </ShiftContext.Provider>
    );
  };
  return <div className="App">{helperFunction()}</div>;
};
const mapStateToProps = (state) => ({
  shiftList: state.shiftReducer.allshiftData,
  errorShift: state.shiftReducer.errorShift,
});
const mapDispatchToProps = {
  getShiftDetails: ActionCreater.getShiftDetails,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
