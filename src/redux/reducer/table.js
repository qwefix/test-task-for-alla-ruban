import tableAPI from "../../api/table";

const SETUP_TABLE_LIST = 'SETUP_TABLE_LIST';
const SELECT_PROFILE = 'SELECT_PROFILE';
const CLOSE_INFO = "CLOSE_INFO";
const CHANGE_FILTER_VALUE = 'CHANGE_FILTER_VALUE';

const initialState = {
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
            console.log(action)
            return {
                ...state,
                selectedProfile: state.allUsersArr.find(a => a.id === action.id)
            }
        case CLOSE_INFO:
            return { ...state, selectedProfile: null, }
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
        default:
            return state;
    }
}
export const thunks = {
    setupPage: () => (dispatch) => {
        tableAPI().then(
            resp => {
                dispatch(ac.setupTableList(resp.map((a) => ({
                    ...a,
                    filterString: (a.id + a.firstName + a.lastName + a.email + a.phone + a.adress.state).toUpperCase()
                }))))
            }
        )
    }
}
const ac = {
    setupTableList: (data) => ({ type: SETUP_TABLE_LIST, data }),
    selectProfile: (id) => ({ type: SELECT_PROFILE, id }),
    closeInfo: () => ({ type: CLOSE_INFO }),
    changeFilterValue: (value) => ({ type: CHANGE_FILTER_VALUE, value }),
}

export const tableInterface = {
    selectProfile: ac.selectProfile,
    closeInfo: ac.closeInfo,
    changeFilterValue: ac.changeFilterValue,
}
export default tableReducer