import { JwtAdapter } from '../adapters/jwt.adapter';
import { Server } from "socket.io";
import { UserGateway } from '../modules/users/users.gateway';

export class Sockets {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
    this.socketConnection();
  }
  
  private async validateTokens(clientToken: string): Promise<string> {
    if (!clientToken) throw new Error("Token requerido");
    const payloadUser = await JwtAdapter.validateToken(clientToken);
    const uidUser = (payloadUser as { uid: string }).uid;
    return uidUser;
  }
  
  socketConnection(): void {
    this.io.on('connection', async (socket) => {    
      const token = socket.handshake.headers['gamera-token'];
      
      if (!token || typeof token !== 'string') {
        console.error('Conexión rechazada: Token no proporcionado o inválido');
        socket.disconnect();
        return;
      }

    try {
      const uid = await this.validateTokens(token);
      console.log(`Usuario conectado al socket: ${uid}`);
      socket.join(uid);
      new UserGateway(this.io, socket, uid);
    } catch (error) {
      console.error(`Error en la conexion del socket: ${(error as Error).message}`);
      socket.disconnect();
    }
  });
}

}