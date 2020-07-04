import React from "react";
import { Button } from "../Generic/Button";
import { groupByTime } from "../Generic/HelperFunctions";

const Filter = (props) => {
  const { locationList = [], shiftList = [] } = props.data.parentProps;
  const { location, date } = props.filterValues;
  let dateList = Object.keys(groupByTime(shiftList, "startTime", "endTime"));
  const LocationFilter = () => {
    return (
      <div className="filterDropdown">
        <select
          id="locationNames"
          className="dropdown"
          value={location}
          onChange={(e) => {
            props.setFilterValues({
              ...props.filterValues,
              location: e.target.value,
            });
          }}
        >
          <option disabled value="" className="">
            {"Area : All"}
          </option>
          {locationList.map((name, index) => {
            return (
              <option key={index} value={name}>
                {name}
              </option>
            );
          })}
        </select>
      </div>
    );
  };
  const DateFilter = () => {
    return (
      <div className="filterDropdown">
        <select
          id="dateFilter"
          className="dropdown"
          value={date}
          onChange={(e) => {
            props.setFilterValues({
              ...props.filterValues,
              date: e.target.value,
            });
          }}
        >
          <option disabled value="" className="">
            {"Date : All"}
          </option>
          {dateList.map((name, index) => {
            return (
              <option key={index} value={name}>
                {name}
              </option>
            );
          })}
        </select>
      </div>
    );
  };
  return (
    <div className="filterDiv">
      <span className="filterLabel">Filters:</span>
      <LocationFilter /> <DateFilter />
      <span className="filterClearButton">
        <Button
          className="clearButton"
          label="Clear"
          onClick={() => {
            props.setFilterValues({
              location: "",
              date: "",
            });
          }}
        />
      </span>
    </div>
  );
};
export default Filter;
