import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/authSlice'
import { todoSlice } from './slices/todoSlice'
import { userSlice } from './slices/userSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        todo: todoSlice.reducer,
        user: userSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch