import { createSlice } from '@reduxjs/toolkit';

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


export default appSlice.reducer;
