import { configureStore } from '@reduxjs/toolkit';
import { toDoListReducer,toDoDetailsReducer} from './reducers/toDoReducer';


const toDosFromStorage = localStorage.getItem('toDos')
    ? JSON.parse(localStorage.getItem('toDos'))
    : []

const initialState = {
    toDoList: {
        toDos: toDosFromStorage,
    }
}

const store = configureStore({
    reducer: {
        toDoList: toDoListReducer,
        toDoDetails:toDoDetailsReducer,
    },
    preloadedState: initialState,
})


export default store;