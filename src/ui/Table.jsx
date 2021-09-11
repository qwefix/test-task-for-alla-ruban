import React from "react"
import TableRow from "./TableRow/TableRow"
import c from './Table.module.css'
import Info from './Info/Info'
import { Filter } from './Filter/Filter'
import TableHeader from "./TableHeader/TableHeader"
import Pagination from "./Pagination/Pagination"

function Table(props) {
    console.log(props)
    return <div className={c.wrapper}>
        <Filter value={props.filterValue} handler={props.changeFilterValue} />
        <Pagination currentPage={props.page+1} totalPages={Math.ceil(props.filtredUsers.length  /10)} selectPage={props.selectPage}  />
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