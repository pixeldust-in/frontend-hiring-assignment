import React from "react";
import ShiftDetails from "./ShiftDetails";
import { groupByTime, sortArray } from "../Generic/HelperFunctions";

const AvailableShifts = (props) => {
  const noData = <div className="noData">{"No Data"}</div>;
  const { shiftList = [] } = props.parentProps;
  const { date = "", location = "" } = props.filterValues;
  let groupedByTime = groupByTime(shiftList, "startTime", "endTime");

  const groupedShiftDetails = (data = []) => {
    return (
      <ul className="list-group list-group-flush">
        {data.map((shiftObj, index) => {
          return shiftObj ? (
            <ShiftDetails
              shiftData={shiftObj}
              key={index}
              parentProps={props.parentProps}
              isStatusRequired
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
          id={`availableHeader${index}`}
          className="card-header headerInfo"
          onClick={(e) => headerHideShowToggle(e)}
        >
          {shiftDate}
        </div>
        {groupedShiftDetails(sortArray(filteredList))}
      </React.Fragment>
    );
  };

  const helperFunction = (index, shiftDate) => {
    let groupData = groupedByTime[shiftDate];
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
    let obj = shiftList.length
      ? date
        ? helperFunction(0, date)
        : Object.keys(groupedByTime).map((shiftDate, index) => {
            return helperFunction(index, shiftDate);
          })
      : noData;
    return obj ? obj : noData;
  };
  return component();
};
export default AvailableShifts;
