import {
    TO_DO_LIST_REQUEST,
    TO_DO_LIST_SUCCESS,
    TO_DO_LIST_FAIL,
    TO_DO_CREATE_SUCCESS,
    TO_DO_DETAILS_SUCCESS,
    TO_DO_DETAILS_REQUEST,
    TO_DO_DETAILS_FAIL,
    TO_DO_UPDATE_SUCCESS,
    TO_DO_DELETE_SUCCESS,
} from "../constants/toDoListConstants"

export const toDoListReducer = (state = { toDos: [] }, action) => {
    switch (action.type) {
        case TO_DO_LIST_REQUEST:
            return { loading: true, toDos: [] }
        case TO_DO_LIST_SUCCESS:
            return { loading: false, toDos: action.payload }
        case TO_DO_LIST_FAIL:
            return { loading: false, error: action.payload }
        case TO_DO_CREATE_SUCCESS:
            return { loading: false, toDos: [...state.toDos, action.payload] }
        case TO_DO_UPDATE_SUCCESS:
            return { loading: false, toDos: action.payload }
        case TO_DO_DELETE_SUCCESS:
            return { loading: false, toDos: action.payload }
        default:
            return state
    }
}

export const toDoDetailsReducer = (state = { toDo: {} }, action) => {
    switch (action.type) {
        case TO_DO_DETAILS_REQUEST:
            return { loading: true, ...state }
        case TO_DO_DETAILS_SUCCESS:
            return { loading: false, toDo: action.payload }
        case TO_DO_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
