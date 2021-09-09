import { connect } from "react-redux"
import { tableInterface,} from "../redux/reducer/table"
import Table from "./Table"
import React from "react"


const mapState=(state)=>state

function TableContainer({setupPage,...props}){
    React.useEffect(() => {
        console.log('mount')
        setupPage()        
    }, [setupPage])
    return <Table {...props}/>
}
export default connect(mapState,tableInterface)(TableContainer)
