import appApi from "../../api/appApi";
import type { Todo } from "../interfaces/todoInterface";
import { getTodos } from "../slices/todoSlice";
import { useAppDispatch, useAppSelector } from "./useStore";

export const useTodoStore = () => {

    const { todos } = useAppSelector(state => state.todo);
    const dispatch = useAppDispatch();

    const getAllTodos = async () => {
        const {data: {content: todos}} =  await appApi.get<{content: Todo[]}>('/todos/');
        dispatch(getTodos(todos));
    }

    const createTodo = async (title: string, description: string) => {
        await appApi.post('/todos/',{
            title,
            description
        });
    };

    const toggleComplete = async ({id}: {id: string}) => {
        await appApi.put(`/todos/${id}`,{
            completed: !todos.find(t => t.id === id)?.completed
        });
    };

    const removeTodo = async (id: string) => {
        await appApi.delete(`/todos/${id}`);    
        };

    const editTodo = async (id: string, title: string, description: string) => {
        await appApi.put(`/todos/${id}`, {
            title,
            description
        });
    };

    return {
        todos,
        getAllTodos,
        createTodo,
        editTodo,
        toggleComplete,
        removeTodo
    };
};
