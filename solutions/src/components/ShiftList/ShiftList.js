import React, { useContext } from 'react'
import { dateFilter, timeRange, getTotalTime } from '../../util/util'
import { ShiftContext } from '../../context/GlobalState'

function ShowList(props) {

  const { myShifts, handleBooking, cancelBooking } = useContext(ShiftContext)

  let shifts = props.shifts.reduce((acc, curr) => {
    let date = new Date(curr['startTime']).toDateString()
    if (acc.hasOwnProperty(date)) {
      acc[date].push(curr)
    } else {
      acc[date] = [curr]
    }
    return acc
  }, {})

  const overlapping = (time) => {
    let datetime = new Date(time)

    for (let shift of myShifts) {
      let startTime = new Date(shift['startTime'])
      let endTime = new Date(shift['endTime'])
      if (datetime >= startTime && datetime <= endTime) {
        return true
      }
    }
    return false
  }

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
                      <div>
                        {
                          sh['booked'] ? (
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="mx-3 f-blue text-bold">Booked</div>
                              <button className="cancel-btn" data-id={sh['id']} type="button" onClick={cancelBooking}>Cancel</button>
                            </div>
                          ) : (
                            <div className="d-flex justify-content-between align-items-center">
                              
                                {
                                  overlapping(sh['startTime']) ? 
                                    <div className="mx-3 f-red text-bold">
                                      Overlapping
                                    </div>
                                    :
                                    null
                                }
                              
                              <button className="book-btn" data-id={sh['id']} type="button"
                                disabled={overlapping(sh['startTime'])}
                                onClick={handleBooking}>
                                Book
                              </button>
                            </div>
                          )
                        }
                      </div>
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