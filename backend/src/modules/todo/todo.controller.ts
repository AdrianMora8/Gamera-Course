import { Request, Response } from 'express';
import { TodoService } from './todo.service';
import { todoData } from './todo.interface';
import { HandlerErrors } from '../../helpers/handler-erros.helper';
import { AuthenticatedRequest } from '../../middleware/validateToken.middleware';
import { Server as SocketIOServer } from 'socket.io';

export class TodoController {
  
  constructor(
    private todoService: TodoService,
    private io: SocketIOServer
  ) { }


  getAll = async (_: Request, res: Response) => {
    const todoData = await this.todoService.getAll();

    if (!todoData) HandlerErrors.notFound('No se encontraron tareas');
    res.status(200).json({
        ok: true,
        msg: 'Lista de tareas',
        content: todoData
      });
    return;
  }

  create = async (req: AuthenticatedRequest, res: Response) => {
    const dataTodo: todoData = req.body;
    const uid= req.uid as string;
    const todo = await this.todoService.create(dataTodo, uid);
    
    if (!todo) HandlerErrors.badRequest('Error al crear la tarea');

    this.io.emit("todo-created", todo);

    res.status(201).json({
      ok: true,
      msg: 'Tarea creada',
      content: todo
    });
    return;
  }

  

  update = async (req: Request, res: Response) => {
    const id = req.params.id;
    const dataUpdate: Partial<todoData> = req.body;
    const updated = await this.todoService.update(id, dataUpdate);

    if (!updated) HandlerErrors.notFound('Tarea no encontrada');

    this.io.emit("todo-updated", updated);

    return res.status(200).json({ 
      ok: true, 
      msg: 'Tarea actualizada', 
      content: updated });
  }

  delete = async (req: Request, res: Response) => {
    const id = req.params.id;
    const deleted = await this.todoService.delete(id);

    if (!deleted) HandlerErrors.notFound('Tarea no encontrada');

    this.io.emit("todo-deleted", { id });

    return res.status(200).json({ 
      ok: true, 
      msg: 'Tarea eliminada', 
      content: null });
  }
}
