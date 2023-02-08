import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        todos: [],
    },
    reducers: {
        setTodos: (state, action) => {
            state.todos = action.payload;
        },
    }
});

export const { setTodos } = appSlice.actions;

export const getTodos = () => {
    return async (dispatch) => {
        try {
            const result = await fetch(`http://localhost:8000/todos/`);
            const data = await result.json();
            dispatch(setTodos(data));
            return data;
        } catch (e) {
            dispatch(setTodos([]));
            return '';
        }
    };
};

export const updateTodos = (todo, callback) => {
    return () => {
        axios.put(`http://localhost:8000/todos/${todo._id}`,{
            data: todo,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(resp=>{
            callback(resp)
        })
    }
}

export const createTodos = (todo, callback) => {
    return () => {
        axios.post(`http://localhost:8000/todos/`,{
            data: todo,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(resp=>{
            callback(resp)
        })
    }
}

export default appSlice.reducer;
