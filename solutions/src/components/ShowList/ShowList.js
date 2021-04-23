import React from 'react'
import { dateFilter, timeRange, getTotalTime } from '../../util/util'

function ShowList (props) {

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
                            <div className="d-flex align-items-center">
                                <span>{dateFilter(shift)}</span>
                                <small className="mx-2">{shifts[shift].length} shifts</small>
                                <small className="mx-2">{getTotalTime(shifts[shift])} h</small>
                            </div>
                            {
                                shifts[shift].map((sh, i) => {
                                    return (
                                        <div key={shift + index + "_" + i} className="d-flex p-2 justify-content-between align-items-center">
                                            <div>{timeRange(sh['startTime'])} - {timeRange(sh['endTime']) }</div>
                                            <div>
                                                {
                                                    sh['booked'] ? (
                                                        <div className="d-flex justify-content-around align-items-center">
                                                            <div>Booked</div>
                                                            <button data-id={sh['id']} type="button" onClick={props.cancelBooking}>Cancel</button>
                                                        </div>
                                                    ) : ( 
                                                        <div>
                                                            <button className="btn btn-primary" data-id={sh['id']} type="button" onClick={props.handleBooking}>Book</button>
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