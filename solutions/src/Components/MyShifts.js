import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { getMyShifts, cancelShift } from "../store/action";
import { groupBy, sortByDate, sortByTime, getHours } from "../functions";
import { svgRed } from "../assets/preloader/spinner";

function MyShifts(props) {
  const dispatch = useDispatch();

  const [myShifts, setmyShifts] = useState([]);

  useEffect(() => {
    dispatch(getMyShifts());
  }, [dispatch]);

  useEffect(() => {
    setmyShifts(sortByDate(groupBy(props.myShifts, "startTime")));
  }, [props.myShifts]);

  function ShiftCancel(e, id) {
    e.target.className += " btn-spin";
    e.target.innerHTML = svgRed;
    dispatch(cancelShift(id));
    setInterval(() => {
      e.target.className = "btn-cancel";
      e.target.innerHTML = "Cancel";
    }, 2000);
  }

  return (
    <div className='table-div'>
      <div className='my-shifts'>
        {myShifts.map((key) => {
          return (
            <>
              <div className='header'>
                {key[0]}
                <span>
                  {key[1].length} shifts, {getHours(key[1])[0]} h{" "}
                  {getHours(key[1])[1]} m
                </span>
              </div>
              {sortByTime(key[1]).map((row) => {
                return (
                  <div className='table-r'>
                    <div className='table-row'>
                      <p>
                        {new Date(row.startTime).toTimeString().substr(0, 5) +
                          "-" +
                          new Date(row.endTime).toTimeString().substr(0, 5)}
                      </p>
                      <p>{row.area}</p>
                    </div>
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
                );
              })}
            </>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = function (state) {
  return {
    myShifts: state.myShifts,
  };
};

export default connect(mapStateToProps)(MyShifts);
