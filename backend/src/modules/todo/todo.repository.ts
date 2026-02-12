import { TodoModel, TodoDocument } from '../../model/todo.model';
import { todoData } from './todo.interface';

export class TodoRepository {


  
  findAll = async (): Promise<TodoDocument[]> => {
    const todos = await TodoModel.find();
    return todos as TodoDocument[];
  }

  create = async (todo: todoData): Promise<TodoDocument> => {
    const newTodo = await TodoModel.create(todo);

    return newTodo as TodoDocument;
  }

  update = async (id: string, todo: Partial<todoData>): Promise<TodoDocument | null> => {
    const updated = await TodoModel.findByIdAndUpdate(id, todo, { new: true });
    return updated as TodoDocument | null;
  }

  delete = async (id: string): Promise<boolean> => {
    const deleted = await TodoModel.findByIdAndDelete(id);
    return deleted ? true : false;
  }

}
