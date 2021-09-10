import React from "react"
import TableRow from "./TableRow/TableRow"
import c from './Table.module.css'
import Info from './Info/Info'

function Table(props) {
    console.log(props)
    return <div className = {c.wrapper}>
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
                {props.tableList.map((r,i) => <TableRow key={i} select = {props.selectProfile} {...r} />)}
            </tbody>
        </table>
        </div>
        <Info profile={props.selectedProfile} close={props.closeInfo}/>
    </div>
}

export default Table