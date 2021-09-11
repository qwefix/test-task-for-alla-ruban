import React from "react"
import TableRow from "./TableRow/TableRow"
import c from './Table.module.css'
import Info from './Info/Info'
import { Filter } from './Filter/Filter'
import TableHeader from "./TableHeader/TableHeader"

function Table(props) {
    // console.log(props.filtredUsers , props.shownUsers)
    return <div className={c.wrapper}>
        <Filter value={props.filterValue} handler={props.changeFilterValue} />
        <div className={c.table_wrapper}>
            <table className={c.table}>
                <thead className={c.thead}>
                    <tr>
                        {props.columns.map((a, i) => <TableHeader
                            handler={() => { props.selectColumn(a.index) }}
                            key={i} {...a}
                        />)}
                    </tr>
                </thead>
                <tbody>
                    {props.shownUsers
                        .map(r => <TableRow key={r.reduxID} select={props.selectProfile} {...r} />)}
                </tbody>
            </table>
        </div>
        <Info profile={props.selectedProfile} close={props.closeInfo} />
    </div>
}

export default Table