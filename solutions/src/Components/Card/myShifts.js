import React, { useContext } from "react";
import { Button } from "../Generic/Button";
import { ShiftContext } from "../../App";
import { getDate, getTime } from "../Generic/DateandTime";
const MyShifts = (props) => {
  const { shiftList = [], cancelShift } = useContext(ShiftContext);
  let groupBy = (shiftData, key) => {
    return shiftData.reduce((data, date) => {
      (data[date[key]] = data[date[key]] || []).push(date);
      return data;
    }, {});
  };
  return (
    <ul className="list-group list-group-flush">
      {shiftList.map((data, index) => {
        if (data.booked)
          return (
            <li className="list-group-item" key={index}>
              <div className="shiftTime">{`${getTime(data.startTime)}-${getTime(
                data.endTime
              )}`}</div>
              <div className="shiftStatus">{getDate(data.startTime)}</div>
              <div className="shiftbutton">
                <Button
                  className={""}
                  label={"Cancel"}
                  onClick={() => {
                    cancelShift(data.id);
                  }}
                />
              </div>
            </li>
          );
      })}
    </ul>
  );
};
export default MyShifts;
