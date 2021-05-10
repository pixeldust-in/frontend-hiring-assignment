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
          url: `${process.env.REACT_APP_API_ENDPOINT}/shifts`,
          method: 'GET'
        })
        .then(resp => {
            addShift(resp.data)
            addMyShift(resp.data.filter(shift => shift.booked))
        })
      }

      const addBooking = async (id) => {
        try {
            const resp = await axios({
                url: `${process.env.REACT_APP_API_ENDPOINT}/shifts/${id}/book`,
                method: 'POST',
            })
            bookMyShift(id)
            return resp.data
        } catch (err) {
            throw new Error(err)
        }
        
        
    }
  
    const cancelBooking = async (id) => {
      try {
        const resp = await axios({
            url: `${process.env.REACT_APP_API_ENDPOINT}/shifts/${id}/cancel`,
            method: 'POST'
        })
        cancelShift(id)
        return resp.data
      } catch (err) {
        throw new Error(err)
      }
      
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
            addBooking,
            cancelBooking
        }}>
            { children }
        </ShiftContext.Provider>
    )
}