import React, { useContext, useEffect, useState } from 'react'
import { ShiftContext } from '../../context/GlobalState'
import {ReactComponent as SpinnerRed} from '../../spinner_red.svg'
import {ReactComponent as SpinnerGreen} from '../../spinner_green.svg'

const Shift = (props) => {

  const [sh, setSh] = useState(props.shift)
  const [loading, setLoading] = useState(false)
  const { myShifts, cancelBooking, addBooking } = useContext(ShiftContext)

  useEffect(() => {
    setSh(props.shift)
  }, [props.shift])

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

  const handleCancelBooking = async (e) => {
    e.preventDefault()
    setLoading(true)
    let id = e.target.dataset.id
    const resp = await cancelBooking(id)
    if (resp) {
      setLoading(false)
    } 
  }

  const handleBooking = async (e) => {
    e.preventDefault()
    setLoading(true)
    let id = e.target.dataset.id
    const resp = await addBooking(id)
    if (resp) {
      setLoading(false)
    }
  }

  return (
    <div>
      {
        sh['booked'] ? (
          <div className="d-flex justify-content-between align-items-center">
            <div className="mx-3 f-blue text-bold">Booked</div>
            <button className="cancel-btn" data-id={sh['id']} type="button" onClick={handleCancelBooking}>
              {
                loading ? (
                  <SpinnerRed />
                ) : "Cancel"
              }
            </button>
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
              {
                loading ? (
                  <SpinnerGreen />
                ) : "Book"
              }
            </button>
          </div>
        )
      }
    </div>
  )
}

export default Shift