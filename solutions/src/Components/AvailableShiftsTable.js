import React from "react";
import { useDispatch } from "react-redux";
import { bookShift, cancelShift } from "../store/action";

import { svgGreen, svgRed } from "../assets/preloader/spinner";
import {
  groupByObject,
  sortByDate,
  sortByTime,
  checkOverLapped,
} from "../functions";

function AvailableShiftsTable({ data, area }) {
  const dispatch = useDispatch();

  function ShiftCancel(e, id) {
    e.target.className += " btn-spin";
    e.target.innerHTML = svgRed;
    dispatch(cancelShift(id));
  }

  function ShiftBook(e, id) {
    e.target.className += " btn-spin";
    e.target.innerHTML = svgGreen;
    dispatch(bookShift(id));
  }

  return (
    <div className='available-shifts'>
      {data[area] &&
        sortByDate(groupByObject(data[area], "startTime")).map((key) => {
          return (
            <>
              <div className='header'>{key[0]}</div>
              {sortByTime(key[1]).map((row) => {
                return (
                  <div className='table-r'>
                    <div className='table-row'>
                      <p>
                        {new Date(row.startTime).toTimeString().substr(0, 5) +
                          "-" +
                          new Date(row.endTime).toTimeString().substr(0, 5)}
                      </p>
                    </div>
                    {row.booked ? (
                      <div>
                        <span className='booked'>Booked</span>
                        <button
                          className='btn-cancel'
                          onClick={(e) => ShiftCancel(e, row.id)}
                          disabled={
                            new Date() >= new Date(row.startTime) &&
                            new Date() <= new Date(row.endTime)
                              ? true
                              : false
                          }
                        >
                          Cancel
                        </button>
                      </div>
                    ) : !row.booked &&
                      checkOverLapped(data, row.startTime, row.endTime) ? (
                      <div>
                        <span className='overlapped'>Overlapped</span>
                        <button
                          className='btn-book'
                          onClick={(e) => ShiftBook(e, row.id)}
                          disabled
                        >
                          Book
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          className='btn-book'
                          onClick={(e) => ShiftBook(e, row.id)}
                          disabled={
                            new Date() >= new Date(row.startTime) ? true : false
                          }
                        >
                          Book
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          );
        })}
    </div>
  );
}

export default AvailableShiftsTable;
