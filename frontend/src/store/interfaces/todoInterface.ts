export interface Todo {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

export interface CreateTodoInput {
    title: string;
    description: string;
}

export interface UpdateTodoInput {
    title?: string;
    description?: string;
    completed?: boolean;
}

export interface TodoState {
    todos: Todo[];
}
