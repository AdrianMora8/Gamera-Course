import { Route, Routes } from 'react-router'
import { LoginPage, RegisterPage } from '../pages';
import { AuthLayout } from '../layout/AuthLayout';

export const AuthRoutes = () => {
  return (
    <AuthLayout>
        <Routes>
            <Route path="login" element={<LoginPage/>} />
            <Route path="register" element={<RegisterPage/>} />
        </Routes>
    </AuthLayout>
  )
}
