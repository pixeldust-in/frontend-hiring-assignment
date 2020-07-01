import React, { useContext } from "react";
import { Button } from "../Generic/Button";
import { ShiftContext } from "../../App";
import { getDate, getTime } from "../Generic/DateandTime";

const AvailableShifts = () => {
  const { shiftList = [], cancelShift, bookShift } = useContext(ShiftContext);
  const location = [
    ...new Set(
      shiftList.map((data) => {
        return data.area;
      })
    ),
  ];
  let groupByDate = (shiftData, key) => {
    return shiftData.reduce((data, obj) => {
      (data[getDate(obj[key])] = data[getDate(obj[key])] || []).push(obj);
      return data;
    }, {});
  };
  let groupedData = groupByDate(shiftList, "startTime");
  const listData = (data = []) => {
    //console.log(data);
    return (
      <ul className="list-group list-group-flush">
        {data.map((data, index) => {
          let detial = data.booked
            ? {
                className: "a",
                label: "Cancel",
                callback: () => {
                  cancelShift(data.id);
                },
              }
            : {
                className: "a",
                label: "Book",
                callback: () => {
                  bookShift(data.id);
                },
              };
          return (
            <li className="list-group-item" key={index}>
              <div className="shiftTime">{`${getTime(data.startTime)}-${getTime(
                data.endTime
              )}`}</div>
              <div className="shiftStatus">{getDate(data.startTime)}</div>
              <div className="shiftbutton">
                <Button
                  className={detial.className}
                  label={detial.label}
                  onClick={detial.callback}
                />
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  const dateHeader = () => {
    return Object.keys(groupedData).map((shiftDate, index) => {
      return (
        <React.Fragment key={index}>
          <div className="card-header">{shiftDate}</div>
          {listData(groupedData[shiftDate])}
        </React.Fragment>
      );
    });
  };

  return dateHeader();
};
export default AvailableShifts;
