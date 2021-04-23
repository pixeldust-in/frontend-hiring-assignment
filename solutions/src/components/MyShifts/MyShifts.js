import React from 'react'
import ShowList from '../ShowList/ShowList'

const MyShifts = (props) => {

    return (
        <div  className="box">
            {
                <ShowList shifts={props.shifts} 
                    cancelBooking={props.cancelBooking} 
                    handleBooking={props.handleBooking}/>
            }
        </div>
    )
}

export default MyShifts