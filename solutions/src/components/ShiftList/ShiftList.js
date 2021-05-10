import React, { useContext, useState } from 'react'
import { dateFilter, timeRange, getTotalTime } from '../../util/util'
import { ShiftContext } from '../../context/GlobalState'
import Shift from '../Shift/Shift'

function ShowList(props) {

  const { myShifts } = useContext(ShiftContext)

  let shifts = props.shifts.reduce((acc, curr) => {
    let date = new Date(curr['startTime']).toDateString()
    if (acc.hasOwnProperty(date)) {
      acc[date].push(curr)
    } else {
      acc[date] = [curr]
    }
    return acc
  }, {})

  return (
    <div className="">
      {
        Object.keys(shifts).map((shift, index) => {
          return (
            <div key={shift}>
              <div className="d-flex align-items-center bg-bluish-gray p-2">
                <span className="text-bold f-blue">{dateFilter(shift)}</span>
                {
                  props.type === "MyShifts" ? (
                    <>
                      <small className="mx-2">{shifts[shift].length} shifts</small>
                      <small className="mx-2">{getTotalTime(shifts[shift])} h</small>
                    </>
                  ) : null
                }
              </div>
              {
                shifts[shift].map((sh, i) => {
                  return (
                    <div key={shift + index + "_" + i} className="d-flex p-2 justify-content-between align-items-center border-bottom">
                      <div>{timeRange(sh['startTime'])} - {timeRange(sh['endTime'])}</div>
                      <Shift shift={sh} />
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default ShowList