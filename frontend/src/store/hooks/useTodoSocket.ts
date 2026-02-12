import { useContext, useEffect } from "react";
import { SocketContext } from "../../context/sockets";
import { useAppDispatch } from "./useStore";
import { addTodo, deleteTodo, updateTodo } from "../slices/todoSlice";
import type { Todo } from "../interfaces/todoInterface";

export const useTodoSocket = () => {
  const { socket } = useContext(SocketContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!socket) return;

    const handleTodoCreated = (newTodo: Todo) => {
      dispatch(addTodo(newTodo));
    };
    const handleTodoUpdated = (updatedTodo: Todo) => {
      dispatch(updateTodo(updatedTodo));
    };
    const handleTodoDeleted = ({ id }: { id: string }) => {
      dispatch(deleteTodo(id));
    };

    socket.on("todo-created", handleTodoCreated);
    socket.on("todo-updated", handleTodoUpdated);
    socket.on("todo-deleted", handleTodoDeleted);

    return () => {
      socket.off("todo-created", handleTodoCreated);
      socket.off("todo-updated", handleTodoUpdated);
      socket.off("todo-deleted", handleTodoDeleted);
    };
  }, [socket, dispatch]);
};
