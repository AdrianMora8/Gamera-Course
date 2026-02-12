import { Router} from 'express';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoRepository } from './todo.repository';
import { validateJWT } from '../../middleware/validateToken.middleware';
import { validate } from '../../middleware/zod';
import { createTodoSchema, todoIdParamSchema, updateTodoSchema } from './todo.validate';
import { Server as SocketIOServer } from 'socket.io';

export class TodoRoutes {
    static getRoutes(io: SocketIOServer): Router {
        const router = Router();
        const todoRepository = new TodoRepository();
        const todoService = new TodoService(todoRepository);
        const todoController = new TodoController(todoService, io);

        router.get('/', validateJWT, todoController.getAll);
        router.post('/', validateJWT, validate(createTodoSchema, "body"), todoController.create);
        router.put('/:id', validateJWT, validate(updateTodoSchema, "body"),validate(todoIdParamSchema, "params"), todoController.update);
        router.delete('/:id', validateJWT, validate(todoIdParamSchema, "params"), todoController.delete);

        return router;
    }
}