import React, { useContext } from "react";
import { ShiftContext } from "../../App";
import { ShiftDetails } from "./ShiftDetails";
import { groupBy, sortArray } from "../Generic/HelperFunctions";

const MyShifts = () => {
  const { myShifts = [] } = useContext(ShiftContext);
  let groupedData = groupBy(myShifts, "startTime");
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
    return Object.keys(groupedData).map((shiftDate, index) => {
      return (
        <React.Fragment key={index}>
          <div className="card-header headerInfo">{shiftDate}</div>
          {groupedShiftDetails(sortArray(groupedData[shiftDate]))}
        </React.Fragment>
      );
    });
  };
  return component();
};
export default MyShifts;
