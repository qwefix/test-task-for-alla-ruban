import tableAPI from "../../api/table";

const templateColumns = [
    { name: 'id', index: 0, }, { name: 'First name', index: 1, },
    { name: 'Last Name', index: 2, }, { name: 'Email', index: 3, },
    { name: 'Phone', index: 4, }, { name: 'State', index: 5, }
]
const SELECT_COLUMN_HEADER = 'SELECT_COLUMN_HEADER';
const SETUP_TABLE_LIST = 'SETUP_TABLE_LIST';
const SELECT_PROFILE = 'SELECT_PROFILE';
const CLOSE_INFO = "CLOSE_INFO";
const CHANGE_FILTER_VALUE = 'CHANGE_FILTER_VALUE';

const initialState = {
    columns: [...templateColumns],
    shownUsers: [],
    allUsersArr: [],
    filtredUsers: [],
    selectedProfile: null,
    filterValue: '',
    page: 1,
};
const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case SETUP_TABLE_LIST:
            console.log('remove spinner')
            return {
                ...state,
                shownUsers: [...action.data].splice(0, 10),
                allUsersArr: action.data,
            }
        case SELECT_PROFILE:
            return {
                ...state,
                selectedProfile: state.allUsersArr.find(a => a.reduxID === action.reduxID)
            }
        case CLOSE_INFO:
            return {
                ...state,
                selectedProfile: null,
            }
        case CHANGE_FILTER_VALUE:
            let filtredArr = [...state.allUsersArr]
                .filter(a => a.filterString.includes(
                    action.value.split('').filter(a => a !== ' ').join('').toUpperCase()))
            return {
                ...state,
                filterValue: action.value.split('').filter(a => a !== ' ').join(''),
                filtredUsers: filtredArr,
                shownUsers: [...filtredArr].splice(0, 10),
            }
        case SELECT_COLUMN_HEADER:
            let modifiedArr = [...templateColumns]
            let modifiedItem = { ...state.columns[action.id] }
            console.log(modifiedItem)
            switch (modifiedItem.arrow) {
                case undefined:
                    modifiedItem.arrow = 'down'
                    break;
                case 'down':
                    modifiedItem.arrow = 'up'
                    break;
                case 'up':
                    modifiedItem.arrow = undefined
                    break;
            }
            modifiedArr.splice(action.id, 1, modifiedItem)
            return {
                ...state,
                columns: modifiedArr,
            }
        default:
            return state;
    }
}
export const thunks = {
    setupPage: () => (dispatch) => {
        tableAPI().then(
            resp => {
                dispatch(ac.setupTableList(resp.map((a, i) => ({
                    ...a,
                    filterString: (a.id + a.firstName + a.lastName + a.email + a.phone + a.adress.state).toUpperCase(),
                    reduxID: i,
                }))))
            }
        )
    }
}
const ac = {
    selectColumn: (id) => ({ type: SELECT_COLUMN_HEADER, id }),
    setupTableList: (data) => ({ type: SETUP_TABLE_LIST, data }),
    selectProfile: (reduxID) => ({ type: SELECT_PROFILE, reduxID }),
    closeInfo: () => ({ type: CLOSE_INFO }),
    changeFilterValue: (value) => ({ type: CHANGE_FILTER_VALUE, value }),
}

export const tableInterface = {
    selectProfile: ac.selectProfile,
    closeInfo: ac.closeInfo,
    changeFilterValue: ac.changeFilterValue,
    selectColumn: ac.selectColumn,
}
export default tableReducer