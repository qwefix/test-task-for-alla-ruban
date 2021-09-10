import React from "react"
import TableRow from "./TableRow/TableRow"
import c from './Table.module.css'
import Info from './Info/Info'
import {Filter} from './Filter/Filter'

function Table(props) {
    console.log(props)
    return <div className = {c.wrapper}>
        <Filter value={props.filterValue} handler ={props.changeFilterValue}/>
        <div className = {c.table_wrapper}>
        <table className={c.table}>
            <thead className={c.thead}>
                <tr>
                    <th>id</th>
                    <th>First name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>State</th>
                </tr>
            </thead>
            <tbody>
                {props.shownUsers.map((r,i) => <TableRow key={i} select = {props.selectProfile} {...r} />)}
            </tbody>
        </table>
        </div>
        <Info profile={props.selectedProfile} close={props.closeInfo}/>
    </div>
}

export default Table