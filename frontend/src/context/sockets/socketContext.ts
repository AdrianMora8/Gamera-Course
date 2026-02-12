import { createContext } from "react";
import type { Socket } from "socket.io-client";

interface ContextProps {
  socket: Socket | null;
  online: boolean;
}
export const SocketContext = createContext<ContextProps>({
  socket: null,
  online: false,
});