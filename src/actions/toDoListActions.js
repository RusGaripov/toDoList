import {
    TO_DO_LIST_REQUEST,
    TO_DO_LIST_SUCCESS,
    TO_DO_LIST_FAIL,
    TO_DO_CREATE_SUCCESS,
    TO_DO_DETAILS_REQUEST,
    TO_DO_DETAILS_SUCCESS,
    TO_DO_DETAILS_FAIL,
    TO_DO_UPDATE_SUCCESS,
    TO_DO_DELETE_SUCCESS,
} from "../constants/toDoListConstants"

//get ToDos
export const getToDos = () => (dispatch) => {
    try {
        dispatch({ type: TO_DO_LIST_REQUEST })
        const toDosFromStorage = localStorage.getItem('toDos')
            ? JSON.parse(localStorage.getItem('toDos'))
            : []

        dispatch({
            type: TO_DO_LIST_SUCCESS,
            payload: toDosFromStorage
        })
    } catch (error) {
        dispatch({
            type: TO_DO_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
// create new ToDo
export const createToDo = ({ id, header, description, isDone, deadline, files }) => (dispatch, getState) => {

    const newToDo = { id, header, description, isDone, deadline, files }

    dispatch({
        type: TO_DO_CREATE_SUCCESS,
        payload: newToDo
    })

    localStorage.setItem('toDos', JSON.stringify(getState().toDoList.toDos))
}

//get a particular ToDo

export const getToDo = (id) => (dispatch, getState) => {
    let editedTodo = getState().toDoList.toDos.filter(x => x.id === id);
    try {
        dispatch({ type: TO_DO_DETAILS_REQUEST })
        dispatch({
            type: TO_DO_DETAILS_SUCCESS,
            payload: editedTodo[0]
        })
    } catch (error) {
        dispatch({
            type: TO_DO_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

// update ToDo Item 

export const updateToDo = ({ id, header, description, isDone, deadline }) => (dispatch, getState) => {

    const updatedToDo = { id, header, description, isDone, deadline }

    const updatedToDos = getState().toDoList.toDos.filter(x => x.id !== id);

    updatedToDos.push(updatedToDo)

    dispatch({ type: TO_DO_UPDATE_SUCCESS, payload: updatedToDos })

    localStorage.setItem('toDos', JSON.stringify(getState().toDoList.toDos))
}

// delete ToDo Item 

export const deleteToDo = (id) => (dispatch, getState) => {

    const newToDos = getState().toDoList.toDos.filter(x => x.id !== id);

    dispatch({ type: TO_DO_DELETE_SUCCESS, payload: newToDos })

    localStorage.setItem('toDos', JSON.stringify(getState().toDoList.toDos))
}