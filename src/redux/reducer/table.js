import tableAPI from "../../api/table";

const SETUP_TABLE_LIST = 'SETUP_TABLE_LIST';
const SELECT_PROFILE = 'SELECT_PROFILE';
const CLOSE_INFO = "CLOSE_INFO";

const initialState = {
    tableList: [],
    selectedProfile: null,
};
const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case SETUP_TABLE_LIST:
            console.log('remove spinner')
            return {
                ...state,
                tableList: action.data
            }
        case SELECT_PROFILE:
            return {
                ...state,
                selectedProfile: state.tableList.find(a => a.id === action.id)
            }
        case CLOSE_INFO:
            return { ...state, selectedProfile: null, }
        default:
            return state;
    }
}
export const thunks = {
    setupPage: () => (dispatch) => {
        tableAPI().then(
            resp => {
                dispatch(ac.setupTableList(resp))
            }
        )
    }
}
const ac = {
    setupTableList: (data) => ({ type: SETUP_TABLE_LIST, data }),
    selectProfile: (id) => ({ type: SELECT_PROFILE, id }),
    closeInfo: () => ({ type: CLOSE_INFO })
}

export const tableInterface = {
    selectProfile: ac.selectProfile,
    closeInfo: ac.closeInfo,
}
export default tableReducer