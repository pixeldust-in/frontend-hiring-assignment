import React, { useContext } from "react";
import { ShiftContext } from "../../App";
import ShiftDetails from "./ShiftDetails";
import { groupBy, sortArray } from "../Generic/HelperFunctions";

const MyShifts = () => {
  const { myShifts = [] } = useContext(ShiftContext);
  let groupedData = groupBy(myShifts, "startTime", "endTime");
  let calculateShiftTime = (shift) => {
    let hours = 0;
    shift.forEach((element) => {
      hours += (element.endTime - element.startTime) / 1000 / 60;
    });
    // Logical Error
    hours = new Date(new Date().setMinutes(hours));
    return `${shift.length} shifts, ${
      hours.getHours() ? hours.getHours() + " h " : ""
    } ${hours.getMinutes() ? hours.getMinutes() + " mins" : ""}`;
  };
  const groupedShiftDetails = (data = []) => {
    return (
      <ul className="list-group list-group-flush">
        {data.map((data, index) => {
          return data ? <ShiftDetails shiftData={data} key={index} /> : null;
        })}
      </ul>
    );
  };
  const component = () => {
    let obj = myShifts.length ? (
      Object.keys(groupedData).map((shiftDate, index) => {
        return (
          <React.Fragment key={index}>
            <div className="card-header headerInfo">
              <span>{shiftDate}</span>&nbsp;&nbsp;
              <span className="shiftInfo">
                {calculateShiftTime(groupedData[shiftDate])}
              </span>
            </div>
            {groupedShiftDetails(sortArray(groupedData[shiftDate]))}
          </React.Fragment>
        );
      })
    ) : (
      <div className="card-header headerInfo">{"No Data"}</div>
    );
    return obj;
  };
  return component();
};
export default MyShifts;
