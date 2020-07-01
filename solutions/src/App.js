import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as ActionCreater from "./API/ActionCreator";
import "./App.css";
import { MainComponent } from "./Components/MainComponent";

export const ShiftContext = React.createContext(null);

const App = (props) => {
  let contextData = {
    getShiftDetails: () => props.getShiftDetails(),
    bookShift: (shiftId) => props.bookShift(shiftId),
    cancelShift: (shiftId) => props.cancelShift(shiftId),
    shiftList: props.shiftList,
  };
  useEffect(() => {
    props.getShiftDetails();
  }, []);
  return (
    <div className="App">
      <ShiftContext.Provider value={contextData}>
        <MainComponent />
      </ShiftContext.Provider>
    </div>
  );
};
const mapStateToProps = (state) => ({
  shiftList: state.shiftReducer.allshiftData,
});
const mapDispatchToProps = {
  getShiftDetails: ActionCreater.getShiftDetails,
  bookShift: ActionCreater.bookShift,
  cancelShift: ActionCreater.cancelShift,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
