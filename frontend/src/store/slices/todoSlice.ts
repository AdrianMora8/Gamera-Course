import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Todo } from "../interfaces/todoInterface";

interface InitialState {
    todos: Todo[];
}

const initialState: InitialState = {
    todos: [],
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        getTodos: (state, { payload }: PayloadAction<Todo[]>) => {
            state.todos = payload;
        },
        addTodo: (state, { payload }: PayloadAction<Todo>) => {
            state.todos.push(payload);
        },
        updateTodo: (state, { payload }: PayloadAction<Todo>) => {
            const index = state.todos.findIndex(t => t.id === payload.id);
            if (index !== -1) {
                state.todos[index] = payload;
            }
        },
        toggleTodo: (state, { payload }: PayloadAction<string>) => {
            const todo = state.todos.find(t => t.id === payload);
            
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        deleteTodo: (state, { payload }: PayloadAction<string>) => {
            state.todos = state.todos.filter(t => t.id !== payload);
        }
    }
});

export const {
    addTodo,
    getTodos,
    updateTodo,
    toggleTodo,
    deleteTodo
} = todoSlice.actions;

export default todoSlice.reducer;
