import React from 'react'
import MyShifts from './components/MyShifts/MyShifts'
import AvailableShifts from './components/AvailableShifts/AvailableShifts'
import Tabs  from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import './App.css';
import { ShiftContextProvider } from './context/GlobalState'

function App() {

  return (
    <ShiftContextProvider>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6 p-4">
            <Tabs className="tabs justify-content-center" defaultActiveKey="my-shifts" transition={false}>
              <Tab tabClassName="tab" eventKey="my-shifts" title="My Shifts">
                <MyShifts />
              </Tab>
              <Tab tabClassName="tab" eventKey="available-shifts" title="Available Shifts">
                <AvailableShifts />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </ShiftContextProvider>
  );
}

export default App;
