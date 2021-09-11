import tableAPI from "../../api/table";

const templateColumns = [
    { name: 'id', index: 0, path: 'id', },
    { name: 'First name', index: 1, path: 'firstName', },
    { name: 'Last Name', index: 2, path: 'lastName', },
    { name: 'Email', index: 3, path: 'email', },
    { name: 'Phone', index: 4, path: 'phone', },
    { name: 'State', index: 5, path: 'state', },
]
const SELECT_COLUMN_HEADER = 'SELECT_COLUMN_HEADER';
const SETUP_TABLE_LIST = 'SETUP_TABLE_LIST';
const SELECT_PROFILE = 'SELECT_PROFILE';
const CLOSE_INFO = "CLOSE_INFO";
const CHANGE_FILTER_VALUE = 'CHANGE_FILTER_VALUE';
const ORDER_SHOWN_ARRAY = 'ORDER_SHOWN_ARRAY';
const SELECT_PAGE = 'SELECT_PAGE';

const initialState = {
    columns: [...templateColumns],
    shownUsers: [],
    allUsersArr: [],
    filtredUsers: [],
    selectedProfile: null,
    filterValue: '',
    page: 0,
};
const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case SETUP_TABLE_LIST:
            console.log('remove spinner')
            return {
                ...state,
                filtredUsers: action.data,
                allUsersArr: action.data,
                shownUsers: [...action.data].splice(0, 10),
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
                page: 0,
            }
        case SELECT_COLUMN_HEADER:
            let modifiedArrOfColumns = [...templateColumns]
            let modifiedItem = { ...state.columns[action.id] }
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
                default:
                    break;
            }
            modifiedArrOfColumns.splice(action.id, 1, modifiedItem)
            return {
                ...state,
                columns: modifiedArrOfColumns,
                page: 0,
            }
        case ORDER_SHOWN_ARRAY:
            let columnOrderBy = state.columns.find(c => c.arrow);
            if (!columnOrderBy) return { ...state, shownUsers: [...state.allUsersArr].splice(state.page, 10) };

            let directionMult = 1;
            const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
            if (columnOrderBy.arrow === 'up') directionMult = -1;
            let orderedArray = [...state.filtredUsers].sort((a, b) =>
                directionMult * collator.compare(a[columnOrderBy.path], b[columnOrderBy.path]))
            return {
                ...state,
                filtredUsers: [...orderedArray],
                shownUsers: [...orderedArray].splice(state.page, 10),
            }
        case SELECT_PAGE:
            return {
                ...state,
                page: action.page,
                shownUsers: [...state.filtredUsers].splice(action.page * 10, 10)
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
                    filterString: [a.id, a.firstName, a.lastName, a.email, a.phone].join('+').toUpperCase(),
                    reduxID: i,
                    state: a.adress.state,
                }))))
            }
        )
    },
    changeFilterValue: (value) => (dispatch) => {
        dispatch(ac.changeFilterValue(value));
        dispatch(ac.orderShownArray());
    },
    selectColumn: (id) => (dispatch) => {
        dispatch(ac.selectColumn(id));
        dispatch(ac.orderShownArray());
    }
}
const ac = {
    setupTableList: (data) => ({ type: SETUP_TABLE_LIST, data }),

    selectColumn: (id) => ({ type: SELECT_COLUMN_HEADER, id }),
    changeFilterValue: (value) => ({ type: CHANGE_FILTER_VALUE, value }),

    selectProfile: (reduxID) => ({ type: SELECT_PROFILE, reduxID }),
    closeInfo: () => ({ type: CLOSE_INFO }),

    orderShownArray: () => ({ type: ORDER_SHOWN_ARRAY, }),

    selectPage: (page) => ({
        type: SELECT_PAGE,
        page: page - 1,
    })
}

export const tableInterface = {
    selectProfile: ac.selectProfile,
    closeInfo: ac.closeInfo,

    changeFilterValue: thunks.changeFilterValue,
    selectColumn: thunks.selectColumn,

    selectPage: ac.selectPage,
}
export default tableReducer