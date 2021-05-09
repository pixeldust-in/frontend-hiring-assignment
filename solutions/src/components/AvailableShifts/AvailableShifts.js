import React , { useState, useEffect, useContext } from 'react'
import { groupBy } from '../../util/util'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import ShowList from '../ShiftList/ShiftList'
import { ShiftContext } from '../../context/GlobalState'
import cls from './AvailableShifts.module.css'

const AvailableShifts = (props) => {
    const { shifts } = useContext(ShiftContext)
    const [grouped, setGrouped] = useState({})

    useEffect(() => {
        let groupedShifts = groupBy([...shifts], 'area')
        setGrouped(groupedShifts)
    }, [shifts])

    return (
        <div className={cls['box']}>
            <Tabs defaultActiveKey="Helsinki" className={[cls['nav-tabs'], "justify-content-between"].join(' ')}>
            {
                Object.keys(grouped).map((shift, index) => (
                    <Tab className={[cls['nav-tab']].join(' ')} 
                        eventKey={shift} key={`${shift}_${index}`} 
                        title={`${shift} (${grouped[shift].length})`}>
                        <ShowList shifts={grouped[shift]} type="AvailableShifts" />
                    </Tab>
                ))
            }
            </Tabs>
        </div>
    )
}

export default AvailableShifts