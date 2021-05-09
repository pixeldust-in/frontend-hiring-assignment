import React, { useContext } from 'react'
import { ShiftContext } from '../../context/GlobalState'
import ShowList from '../ShiftList/ShiftList'
import cls from './MyShifts.module.css'

const MyShifts = (props) => {

    const { myShifts } = useContext(ShiftContext)

    return (
        <div className={cls["box"]}>
            {
                <ShowList shifts={myShifts} type="MyShifts" />
            }
        </div>
    )
}

export default MyShifts