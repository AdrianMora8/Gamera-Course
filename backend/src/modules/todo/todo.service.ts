
import { todoData } from "./todo.interface";
import { TodoRepository } from "./todo.repository";

export class TodoService {
  constructor(private todoRepository: TodoRepository) {}

  getAll = async () => {
    const todos = await this.todoRepository.findAll();
    return todos.map(todo => ({
      id: todo._id.toString(),
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      uid: todo.uid
    }));
  };

  create = async (todo: todoData, uid: string) => {
    const todoWithUser: todoData = {
      ...todo,
      uid
    };

    const createdTodo = await this.todoRepository.create(todoWithUser);
    return {
      id: createdTodo._id.toString(),
      title: createdTodo.title,
      description: createdTodo.description,
      completed: createdTodo.completed,
      uid: createdTodo.uid
    };
  };

  update = async (
    id: string,
    updateTodo: Partial<todoData>
  ) => {
    const updatedTodo = await this.todoRepository.update(id, updateTodo);
    if (!updatedTodo) return null;
    
    return {
      id: updatedTodo._id.toString(),
      title: updatedTodo.title,
      description: updatedTodo.description,
      completed: updatedTodo.completed,
      uid: updatedTodo.uid
    };
  };

  delete = async (id: string): Promise<boolean> => {
    return await this.todoRepository.delete(id);
  };
}

