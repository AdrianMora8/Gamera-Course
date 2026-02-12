import { useContext, useEffect } from "react";
import { useUserStore } from "../../../store/hooks/useUserStore";
import { SocketContext } from "../../../context/sockets";


export const Sidebar = () => {
  const { getAllUsers, users, setUsers } = useUserStore();
  const { socket } = useContext(SocketContext);
  
  useEffect(() => {
    if (!socket) return;

    const handleUserStatus = (payload: any) => {
      console.log(payload);
      if (Array.isArray(payload) && payload.length > 0) {
        setUsers(payload);
      }
    };

    socket.on("user-status", handleUserStatus);

    return () => {
      socket.off("user-status", handleUserStatus);
    };
  }, [socket, setUsers]);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return (
    <aside className="w-56 bg-sky-600 fixed left-0 top-0 h-screen flex flex-col shadow-lg">
      <div className="p-6 border-b border-sky-500">
        <h2 className="text-white text-lg font-semibold">
          Usuarios
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {Array.isArray(users) && users.map((user, index) => (
          <div 
            key={index} 
            className="flex items-center gap-3 py-3 border-b border-sky-500/30 last:border-0"
          >
            <div className={`w-2.5 h-2.5 rounded-full ${user.isOnline ? 'bg-green-400' : 'bg-red-400'}`} />
            
            <div className="flex-1">
              <p className="text-white text-sm font-medium">
                {user.name} {user.lastName}
              </p>
            </div>
          </div>
        ))}

        {(!users || users.length === 0) && (
          <div className="text-center py-8">
            <p className="text-sky-200 text-sm">No hay usuarios</p>
          </div>
        )}
      </div>
    </aside>
  );
};
