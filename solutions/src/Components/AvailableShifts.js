import React, { useEffect } from "react";
import AvailableShiftsTable from "./AvailableShiftsTable";
import { connect, useDispatch } from "react-redux";
import { getAvailableShifts } from "../store/action";
import { useState } from "react";

function AvailableShifts(props) {
  const dispatch = useDispatch();

  const [area, setarea] = useState("");

  useEffect(() => {
    dispatch(getAvailableShifts());
  }, [dispatch]);

  useEffect(() => {
    setarea(Object.keys(props.availableShifts)[0]);
  }, [props.availableShifts]);

  return (
    <div className='table-div'>
      <div className='filter'>
        {Object.keys(props.availableShifts).map(function (key, index) {
          return (
            <button
              key={index}
              className={"btn " + (area === key && "btn-active")}
              onClick={() => setarea(key)}
            >
              {key} ({props.availableShifts[key].length})
            </button>
          );
        })}
      </div>
      <AvailableShiftsTable data={props.availableShifts} area={area} />
    </div>
  );
}

const mapStateToProps = function (state) {
  return {
    availableShifts: state.availableShifts,
  };
};

export default connect(mapStateToProps)(AvailableShifts);
