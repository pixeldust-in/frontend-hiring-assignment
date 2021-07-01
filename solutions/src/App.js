import "./App.css";
import { useState } from "react";
import MyShifts from "./Components/MyShifts";
import AvailableShifts from "./Components/AvailableShifts";

function App() {
  const [MyShift, setMyShift] = useState(true);

  return (
    <div className='App'>
      <button
        className={MyShift ? "btn btn-active" : "btn"}
        onClick={() => setMyShift(true)}
      >
        My Shifts{" "}
      </button>
      <button
        className={MyShift ? "btn" : "btn btn-active"}
        onClick={() => setMyShift(false)}
      >
        Available Shifts
      </button>
      {MyShift === true ? <MyShifts /> : <AvailableShifts />}
    </div>
  );
}

export default App;
