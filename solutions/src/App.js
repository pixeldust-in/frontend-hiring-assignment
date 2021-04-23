import React, { useState, useEffect } from 'react'
import MyShifts from './components/MyShifts/MyShifts'
import AvailableShifts from './components/AvailableShifts/AvailableShifts'
import Tabs  from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import './App.css';
import axios from 'axios'

function App() {

  const [shifts, setShifts] = useState([])
  const [myShifts, setMyShifts] = useState([])

  const fetchShifts = () => {
    axios({
      url: 'http://localhost:8080/shifts',
      method: 'GET'
    })
    .then(resp => {
        setShifts([...resp.data])
        setMyShifts([...resp.data.filter(shift => shift.booked)])
    })
  }

  useEffect(() => {
      fetchShifts()
  }, [])

  const handleBooking = async (e) => {
      e.preventDefault()
      let id = e.target.dataset.id
      await axios({
          url: `http://localhost:8080/shifts/${id}/book`,
          method: 'POST',
      })
      fetchShifts()
  }

  const cancelBooking = async (e) => {
    e.preventDefault()
    let id = e.target.dataset.id
    await axios({
      url: `http://localhost:8080/shifts/${id}/cancel`,
      method: 'POST'
    })
    fetchShifts()
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-6 p-4">
          <Tabs className="tabs justify-content-center" defaultActiveKey="my-shifts" transition={false}>
            <Tab tabClassName="tab" eventKey="my-shifts" title="My Shifts">
              <MyShifts shifts={myShifts} cancelBooking={cancelBooking} />
            </Tab>
            <Tab tabClassName="tab" eventKey="available-shifts" title="Available Shifts">
              <AvailableShifts shifts={shifts} handleBooking={handleBooking} />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default App;
