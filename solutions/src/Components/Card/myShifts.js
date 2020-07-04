import React from "react";
import ShiftDetails from "./ShiftDetails";
import { groupByTime, sortArray } from "../Generic/HelperFunctions";

const MyShifts = (props) => {
  const { myShifts = [] } = props.parentProps;
  const noData = <div className="noData">{"No Data"}</div>;
  const { date = "", location = "" } = props.filterValues;
  let groupedData = groupByTime(myShifts, "startTime", "endTime");

  let calculateShiftTime = (shift = []) => {
    let totalMins = 0,
      hours = 0,
      mins = 0;
    shift.forEach((element) => {
      totalMins += (element.endTime - element.startTime) / 1000 / 60;
    });
    hours = Math.floor(parseInt(totalMins) / 60);
    mins = parseInt(totalMins) % 60;
    return `${
      shift.length <= 1 ? shift.length + " shift" : shift.length + " shifts"
    } , ${hours ? hours + " h " : ""} ${mins ? mins + " mins" : ""}`;
  };

  const groupedShiftDetails = (data = []) => {
    return (
      <ul className="list-group list-group-flush">
        {data.map((data, index) => {
          return data ? (
            <ShiftDetails
              shiftData={data}
              key={index}
              parentProps={props.parentProps}
            />
          ) : null;
        })}
      </ul>
    );
  };

  const headerHideShowToggle = (event) => {
    const element = document.getElementById(event.target.id);
    if (element && element.nextElementSibling.hidden)
      element.nextElementSibling.hidden = false;
    else element.nextElementSibling.hidden = true;
  };

  const header = (index, shiftDate, filteredList) => {
    return (
      <React.Fragment key={index}>
        <div
          id={`myShiftHeader${index}`}
          className="card-header headerInfo"
          onClick={(e) => headerHideShowToggle(e)}
        >
          <span>{shiftDate}</span>&nbsp;&nbsp;
          <span className="shiftInfo">{calculateShiftTime(filteredList)}</span>
        </div>
        {groupedShiftDetails(sortArray(filteredList))}
      </React.Fragment>
    );
  };

  const helperFunction = (index, shiftDate) => {
    let groupData = groupedData[shiftDate];
    if (location) {
      let filteredList =
        location &&
        groupData &&
        groupData.filter((data) => data.area === location);
      return filteredList && filteredList.length
        ? header(index, shiftDate, filteredList)
        : null;
    } else return header(index, shiftDate, groupData);
  };

  const component = () => {
    let obj = myShifts.length
      ? date
        ? helperFunction(0, date)
        : Object.keys(groupedData).map((shiftDate, index) => {
            return helperFunction(index, shiftDate);
          })
      : noData;
    // Null Array
    return obj ? obj : noData;
  };

  return component();
};
export default MyShifts;
