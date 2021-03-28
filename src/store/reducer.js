import * as ActionTypes from './actions'


const initialState = {
    isAuthenticated: false,
    isEnabled: false,
    isExamOn: false,
    word: '',
    speech: {
        points: '',
        count: 1
    },

    user: {
        id: '',
        username: '',
        token: '',
        testCount: 1,
        email: ''
    }
}

const storage = window.localStorage;

const loadStateFromStorage = () => {

    const tmp = {
        isAuthenticated: storage.getItem("isAuth"),
        isEnabled: false,
        isExamOn: false,

        user: {
            id: storage.getItem("userID"),
            username: storage.getItem("userName"),
            token: storage.getItem("token"),
            testCount: storage.getItem("testCount"),
            email: storage.getItem("email")
        }
    }

    return tmp
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
                token: action.token,
                testCount: action.testCount,
                email: action.email
            }
            return {
                ...state,
                user
            }
        case ActionTypes.ENABLE_TEST:

            return {
                ...state,
                isEnabled: true
            }

        case ActionTypes.DISABLE_TEST:

            return {
                ...state,
                isEnabled: false
            }

        case ActionTypes.EXAM_ON:

            return {
                ...state,
                isExamOn: true
            }

        case ActionTypes.EXAM_OFF:

            return {
                ...state,
                isExamOn: false
            }

        case ActionTypes.SAVE_STORAGE:

            storage.setItem("userID", state.user.id)
            storage.setItem("userName", state.user.username)
            storage.setItem("token", state.user.token)
            storage.setItem("testCount", state.user.testCount.toString())
            storage.setItem("email", state.user.email.toString())
            storage.setItem("isAuth", state.isAuthenticated.toString())
            break

        case ActionTypes.LOGOUT:
            let tmp
            storage.clear();

            return (
                tmp = {
                    isAuthenticated: false,
                    isEnabled: false,
                    isExamOn: false,

                    user: {
                        id: '',
                        username: '',
                        token: '',
                        testCount: 1,
                    }
                }
            )

        case ActionTypes.CHECK_STORAGE:

            let temp
            if (storage.getItem("token") != null && storage.testCount != null) {

                return loadStateFromStorage();
            }

            return temp = {
                isAuthenticated: false,
                isEnabled: false,
                isExamOn: false,

                user: {
                    id: '',
                    username: '',
                    token: '',
                    testCount: 1,
                }
            }


        case ActionTypes.UPADTE_TESTS:

            let tempState = state
            tempState.user.testCount++
            return {
                ...tempState
            }

        case ActionTypes.SAVE_WORD:
            return{
                ...state,
                word: action.word
            }
        default:
    }


    return state;

}

export default reducer;