import { useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = (serverPath: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [online, setOnline] = useState(false);

  const conectarSocket = useCallback(() => {
    const token = localStorage.getItem("token");
    const socketTemp: Socket = io(serverPath, {
      transports: ["polling", "websocket"], 
      autoConnect: true,
      forceNew: true,
      extraHeaders: {
        "gamera-token": token || "", 
      },
    });

    setSocket(socketTemp);
  }, [serverPath]);

  const desconectarSocket = useCallback(() => {
    socket?.disconnect();
  }, [socket]);


  useEffect(() => {
    if (!socket) return;

    const handleConnect = () => {
      console.log("Socket conectado");
      setOnline(true);
    };

    const handleDisconnect = () => {
      console.log("Socket desconectado");
      setOnline(false);
    };

    setOnline(socket.connected);

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, [socket]);

  return {
    socket,
    online,
    conectarSocket,
    desconectarSocket,
  };
};