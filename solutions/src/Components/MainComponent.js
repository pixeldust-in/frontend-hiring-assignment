import React, { lazy, Suspense, useState } from "react";

import { Button } from "./Generic/Button";
import Spinner from "./Generic/Spinner";
import Filter from "./Card/Filter";

const componentList = {
  myShifts: {
    name: "My Shifts",
    component: lazy(() => import("./Card/MyShifts")),
  },
  availableShifts: {
    name: "Available Shifts",
    component: lazy(() => import("./Card/AvailableShifts")),
  },
};

const MainComponent = (props) => {
  const initialFilter = { date: "", location: "" };
  const [Component, setComponent] = useState(componentList.myShifts.component);
  const [filterValues, setFilterValues] = useState(initialFilter);
  const [myShiftsActive, setMyShiftsActive] = useState(true);
  const [availableShiftsActive, setAvailableShiftsActive] = useState(false);

  const openComponent = (name) => {
    setMyShiftsActive(name === "myShifts");
    setAvailableShiftsActive(name === "availableShifts");
    setFilterValues(initialFilter);
    setComponent(componentList[name].component);
  };

  return (
    <div>
      <div className="btn-group">
        <Button
          className={`button ${myShiftsActive && "buttonActive"}`}
          label={"My Shifts"}
          onClick={() => {
            openComponent("myShifts");
          }}
        />
        <Button
          className={`button ${availableShiftsActive && "buttonActive"}`}
          label={"Available Shifts"}
          onClick={() => {
            openComponent("availableShifts");
          }}
        />
      </div>
      <div className="card listItem">
        <Suspense
          fallback={<Spinner componentOverlayCSS={"componentOverlay"} />}
        >
          <Filter
            data={props}
            filterValues={filterValues}
            setFilterValues={(value) => {
              setFilterValues(value);
            }}
          />
          <Component
            filterValues={filterValues}
            parentProps={props.parentProps}
          />
        </Suspense>
      </div>
    </div>
  );
};
export default MainComponent;
