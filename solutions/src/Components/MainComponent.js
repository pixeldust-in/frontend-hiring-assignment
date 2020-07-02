import React, { lazy, Suspense, useState } from "react";
import { Button } from "./Generic/Button";

const componentList = {
  myShifts: {
    name: "My Shifts",
    component: lazy(() => import("./Card/myShifts")),
  },
  availableShifts: {
    name: "Available Shifts",
    component: lazy(() => import("./Card/availableShifts")),
  },
};
export const MainComponent = () => {
  let [Component, setComponent] = useState(componentList.myShifts.component);
  const openComponent = (name) => {
    setComponent(componentList[name].component);
  };
  return (
    <div className="conatiner">
      <div className="btn-group">
        <Button
          className={"button"}
          label={"My Shift"}
          onClick={() => openComponent("myShifts")}
        />
        <Button
          className={"button"}
          label={"Available Shifts"}
          onClick={() => openComponent("availableShifts")}
        />
      </div>
      <div className="card listItem">
        <Suspense fallback={<div>Loading....</div>}>
          <Component />
        </Suspense>
      </div>
    </div>
  );
};
