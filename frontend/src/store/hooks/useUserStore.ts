import { useAppDispatch, useAppSelector } from "./useStore";
import type { User } from "../interfaces/userInterface";
import { onSetUsers } from "../slices/userSlice";
import appApi from "../../api/appApi";
import { useCallback } from "react";

export const useUserStore = () => {
  const { users } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  
  const getAllUsers = useCallback( async () => {
    const {data: {content: users}} = await appApi.get<{content: User[]}>("/users/");
    dispatch(onSetUsers(users));
  }, [dispatch]);
  
  const setUsers = useCallback((users: User[]) => {
    dispatch(onSetUsers(users));
  }, [dispatch]);
  

  return {
    users,
    setUsers,
    getAllUsers,
  };
};
