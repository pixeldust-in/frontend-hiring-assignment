import React, { createContext, useReducer, useEffect } from 'react'
import shiftReducer from './ShiftReducer'
import axios from 'axios'

const initialState = {
    myShifts: [],
    shifts: []
}

export const ShiftContext = createContext(initialState)

export const ShiftContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(shiftReducer, initialState)

    const fetchShifts = () => {
        axios({
          url: 'http://localhost:8080/shifts',
          method: 'GET'
        })
        .then(resp => {
            addShift(resp.data)
            addMyShift(resp.data.filter(shift => shift.booked))
        })
      }

      const handleBooking = async (e) => {
        e.preventDefault()
        let id = e.target.dataset.id
        await axios({
            url: `http://localhost:8080/shifts/${id}/book`,
            method: 'POST',
        })
        bookMyShift(id)
    }
  
    const cancelBooking = async (e) => {
      e.preventDefault()
      let id = e.target.dataset.id
      await axios({
        url: `http://localhost:8080/shifts/${id}/cancel`,
        method: 'POST'
      })
      cancelShift(id)
    }
    
      useEffect(() => {
          fetchShifts()
      }, [])

    function addShift(myShifts) {
        dispatch({
            type: 'ADD_SHIFT',
            payload: myShifts
        })
    }
    
    function addMyShift(myShift) {
        dispatch({
            type: 'ADD_MY_SHIFT',
            payload: myShift
        })
    }

    function bookMyShift(id) {
        dispatch({
            type: 'BOOK_MY_SHIFT',
            payload: id
        })
    }
    
    function cancelShift(id) {
        dispatch({
            type: 'CANCEL_MY_SHIFT',
            payload: id
        })
    }

    return (
        <ShiftContext.Provider value={{
            myShifts: state.myShifts,
            shifts: state.shifts,
            dispatch,
            handleBooking,
            cancelBooking
        }}>
            { children }
        </ShiftContext.Provider>
    )
}