import { connect } from "react-redux"
import { tableInterface,thunks} from "../redux/reducer/table"
import Table from "./Table"
import React from "react"
import store from "../redux/store"


const mapState=(state)=>state

function TableContainer(props){
    React.useEffect(() => {
        console.log('mount')
        store.dispatch(thunks.setupPage())        
    },[])
    return <Table {...props}/>
}
export default connect(mapState,tableInterface)(TableContainer)
