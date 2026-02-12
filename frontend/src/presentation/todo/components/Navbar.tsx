import { useAuthStore } from '../../../store/hooks/useAuthStore'
import type { User } from '../../../store/interfaces/authInterface';
import { useNavigate } from 'react-router';

export const Navbar = () => {

    const navigate = useNavigate();
    const {user,startLogout} = useAuthStore();
    return (
        <nav className="bg-white shadow-md px-6 py-4">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold text-sky-600">Todo App</h1>
                <div className="flex items-center gap-4">
                    <span className="text-gray-700">
                        {(user as User)?.completeName }
                    </span>
                    <button     
                    onClick={ () => {
                        startLogout();
                        navigate('/');
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}
