import tableAPI from "../../api/table";

const REMOVE_MAIN_SPINNER = 'REMOVE_MAIN_SPINNER'

const initialState = {
    tableList: [],
};
const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case REMOVE_MAIN_SPINNER:
            console.log('remove spinner')
            break;

        default:
            return state;
    }
}
export const thunks = {
    setupPage: () => (dispatch) => {
        tableAPI().then(
            resp => {
                console.log(resp)
                dispatch(ac.removeSpinner())
            }
        )
    }
}
const ac = {
    removeSpinner: () => ({
        type: REMOVE_MAIN_SPINNER
    })
}

export const tableInterface = {
    setupPage: thunks.setupPage,
}
export default tableReducer