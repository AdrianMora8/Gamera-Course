import { Sockets } from './sockets/sockets';
import http from "http";
import express from "express";
import cors from "cors";
import { envs } from "./config/envs.config";
import { errorMiddleware } from "./middleware/error.middleware";
import { Server as  SocketIOServer} from "socket.io";
import { AppRoutes } from './routes/app.routes';

export class Server {
  private readonly cors = cors;
  private readonly app = express();
  private readonly server = http.createServer(this.app);
  private readonly jsonParser = express.json();
  
  public readonly io = new SocketIOServer(this.server, {
        cors: {
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
            allowedHeaders: ['gamera-token', 'Content-Type'], 
            credentials: true, 
        },
    });

  constructor() {}

  socketConfiguration(): void {
    new Sockets(this.io);
  }

  start(): void {
    this.app.use(this.jsonParser);
    this.app.use(
      this.cors({
        origin: "http://localhost:5173" 
      })
    );
    
    const routes = AppRoutes.getRoutes(this.io);
    this.app.use(routes);
    
    this.app.use(errorMiddleware);
    this.socketConfiguration();
    

    this.server.listen(envs.port, () => {
      console.log(`Server running on port ${envs.port}`);
    });
  }
}
