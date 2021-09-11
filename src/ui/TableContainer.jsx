import { connect } from "react-redux"
import { tableInterface,thunks} from "../redux/reducer/table"
import Table from "./Table"
import React from "react"
import store from "../redux/store"


const mapState=(state)=>({
    shownUsers:state.shownUsers,
    page:state.page,
    filterValue:state.filterValue,
    selectedProfile:state.selectedProfile,
    columns:state.columns,
    orderedUsers:state.orderedUsers,
    allStates:state.allStates,
    selectedState:state.selectedState,
    spinner:state.spinner,
})

function TableContainer(props){
    React.useEffect(() => {
        store.dispatch(thunks.setupPage())        
    },[])
    return <Table {...props}/>
}
export default connect(mapState,tableInterface)(TableContainer)
