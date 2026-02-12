import { useEffect, type JSX } from "react";
import { useAuthStore } from "../../store/hooks/useAuthStore";
import { SocketContext } from "./socketContext";
import { getEnviroments } from "../../helpers";
import { useSocket } from "./hooks";

const { VITE_API_BACKEND_URL } = getEnviroments();

export const SocketProvider = ({ children }: { children: JSX.Element }) => {
  const { socket, online, conectarSocket, desconectarSocket } =
    useSocket(VITE_API_BACKEND_URL);

  const { status } = useAuthStore();

  useEffect(() => {
    if (status === "authenticated") {
      conectarSocket();
    }
  }, [status, conectarSocket]);

  useEffect(() => {
    if (status !== "authenticated") { 
      desconectarSocket();
    }
  }, [status, desconectarSocket]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};