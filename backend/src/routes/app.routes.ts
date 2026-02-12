import { Router } from 'express';
import authRouter from '../modules/auth/auth.routes';
import { TodoRoutes } from '../modules/todo/todo.routes';
import { UserRoutes } from '../modules/users/users.routes';
import { Server as SocketIOServer } from 'socket.io';


export class AppRoutes {
  
  static getRoutes(io: SocketIOServer): Router {
    const router = Router();

    router.use('/api/auth', authRouter);
    router.use('/api/todos', TodoRoutes.getRoutes(io));
    router.use('/api/users', UserRoutes.routes);

    return router;
  }
}