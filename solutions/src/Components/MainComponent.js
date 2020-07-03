import React, { lazy, Suspense, useState } from "react";
import { Button } from "./Generic/Button";
import Spinner from "./Generic/Spinner";

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
const MainComponent = () => {
  let [Component, setComponent] = useState(componentList.myShifts.component);
  let [myShiftsActive, setMyShiftsActive] = useState(true);
  let [availableShiftsActive, setAvailableShiftsActive] = useState(false);
  const openComponent = (name) => {
    setMyShiftsActive(name === "myShifts");
    setAvailableShiftsActive(name === "availableShifts");
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
          <Component />
        </Suspense>
      </div>
    </div>
  );
};
export default MainComponent;
