import React , { useState, useEffect } from 'react'
import { groupBy } from '../../util/util'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import ShowList from '../ShowList/ShowList'

const AvailableShifts = (props) => {
    const [grouped, setGrouped] = useState({})

    useEffect(() => {
        let groupedShifts = groupBy([...props.shifts], 'area')
        setGrouped(groupedShifts)
    }, [props.shifts])

    return (
        <div className="box">
            <Tabs defaultActiveKey="Helsinki" className="justify-content-center">
            {
                Object.keys(grouped).map((shift, index) => (
                    <Tab eventKey={shift} key={`${shift}_${index}`} title={`${shift} (${grouped[shift].length})`}>
                        <ShowList shifts={grouped[shift]} handleBooking={props.handleBooking}/>
                    </Tab>
                ))
            }
            </Tabs>
        </div>
    )
}

export default AvailableShifts