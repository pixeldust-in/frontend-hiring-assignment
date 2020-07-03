import React, { useState } from "react";
import { connect } from "react-redux";

import * as ActionCreater from "../../API/ActionCreator";

import { ShiftContext } from "../../App";
import { Button } from "../Generic/Button";
import { getTime, isButtonDisabled } from "../Generic/HelperFunctions";

const isOverlapped = (currentShift, myShifts) => {
  let overlap = myShifts.find(
    (shift) =>
      shift.startTime < currentShift.endTime &&
      shift.endTime > currentShift.startTime
  );
  return overlap ? true : false;
};

const getButtonProps = (
  id,
  startTime,
  booked,
  data,
  getShiftDetails,
  cancelShift,
  bookShift,
  myShifts,
  setIsLoading
) => {
  let overlap = isOverlapped(data, myShifts),
    passed = isButtonDisabled(startTime);
  let disabledStatus = booked ? "" : (passed || overlap) && "disabled";
  let obj = {
    buttonclassName: `bookButton ${disabledStatus}`,
    buttonlabel: "Book",
    callback: async () => {
      setIsLoading(true);
      await bookShift(id);
      getShiftDetails(() => setIsLoading(false));
    },
    statusClass: "",
    isDisabled: booked ? false : overlap || passed,
  };
  if (booked) {
    obj.buttonclassName = `cancelButton ${disabledStatus}`;
    obj.buttonlabel = "Cancel";
    obj.callback = async () => {
      setIsLoading(true);
      await cancelShift(id);
      getShiftDetails(() => setIsLoading(false));
    };
    obj.statusLabel = "Booked";
  } else if (!passed && overlap) {
    obj.statusClass = "overlap";
    obj.statusLabel = "Overlapping";
  } else return obj;
  return obj;
};

const ShiftDetails = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { id, startTime, endTime, booked, area } = props.shiftData;
  const { myShifts = [] } = React.useContext(ShiftContext);
  let {
    buttonclassName,
    buttonlabel,
    callback,
    statusLabel,
    statusClass,
    isDisabled,
  } = getButtonProps(
    id,
    startTime,
    booked,
    props.shiftData,
    props.getShiftDetails,
    props.cancelShift,
    props.bookShift,
    myShifts,
    setIsLoading
  );
  return (
    <li className="list-group-item listBorder">
      <div className="shiftTime">
        <span className="time">{`${getTime(startTime)}-${getTime(
          endTime
        )}`}</span>
        <span className="subInfo">{area}</span>
      </div>
      <div className={`shiftStatus ${statusClass}`}>
        {props.isStatusRequired && statusLabel}
      </div>
      <div className="leftPanel">
        <Button
          className={`shiftbutton ${buttonclassName}`}
          label={buttonlabel}
          isLoading={isLoading}
          disabled={isDisabled}
          onClick={callback}
        />
      </div>
    </li>
  );
};
const mapStateToProps = (state) => ({
  bookedShift: state.shiftReducer.bookedShift,
  cancelledShift: state.shiftReducer.cancelledShift,
});
const mapDispatchToProps = {
  getShiftDetails: ActionCreater.getShiftDetails,
  bookShift: ActionCreater.bookShift,
  cancelShift: ActionCreater.cancelShift,
};
export default connect(mapStateToProps, mapDispatchToProps)(ShiftDetails);
