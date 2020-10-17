import * as ActionTypes from './actions'


const initialState = {
    isAuthenticated: false,

    user: {
        id: '',
        username: '',
        token: ''
    }
}
const reducer = (state = initialState, action) => {

    switch (action.type) {

        case ActionTypes.AUTH:
            return {
                ...state,
                isAuthenticated: true
            }

        case ActionTypes.STORE_USER:

            const user = {
                id: action.id,
                username: action.username,
                token: action.token
            }

            return {
                ...state,
                user
            }
        default:
    }
    return state;

}

export default reducer;