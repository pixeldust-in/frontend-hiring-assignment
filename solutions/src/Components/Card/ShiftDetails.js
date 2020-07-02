import React from "react";
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
  cancelShift,
  bookShift,
  myShifts
) => {
  let overlap = isOverlapped(data, myShifts),
    passed = isButtonDisabled(startTime);
  let disabledStatus = booked ? "" : (passed || overlap) && "disabled";
  let obj = {
    buttonclassName: `bookButton ${disabledStatus}`,
    buttonlabel: "Book",
    callback: () => {
      bookShift(id);
    },
    statusClass: "",
    isDisabled: booked ? false : overlap || passed,
  };
  if (booked) {
    obj.buttonclassName = `cancelButton ${disabledStatus}`;
    obj.buttonlabel = "Cancel";
    obj.callback = () => {
      cancelShift(id);
    };
    obj.statusLabel = "Booked";
  } else if (isOverlapped(data, myShifts)) {
    obj.statusClass = "overlap";
    obj.statusLabel = "Overlapping";
  } else return obj;
  return obj;
};

export const ShiftDetails = (props) => {
  const { id, startTime, endTime, booked, area } = props.shiftData;
  const { cancelShift, bookShift, myShifts = [] } = React.useContext(
    ShiftContext
  );
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
    cancelShift,
    bookShift,
    myShifts
  );
  return (
    <li className="list-group-item">
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
          disabled={isDisabled}
          onClick={callback}
        />
      </div>
    </li>
  );
};
ShiftDetails.defaultProps = {
  isStatusRequired: false,
};
