import { useFormik } from "formik";
import { useAuthStore } from "../../../store/hooks/useAuthStore";
import { catchError } from "../../../helpers/catchError";
import { Link } from "react-router";


export const LoginPage = () => {

    const {startLogin} = useAuthStore();

    const formik = useFormik({
        initialValues: {
            email: "arthurchavez2399@hotmail.com",
            password: "12345678"
        },
        onSubmit: async (values, {setSubmitting, setStatus}) => {
            setStatus(null);
            try{
                await startLogin(values);
            }   catch (error: unknown) {
                const errorMessage = catchError(error);
                setStatus(errorMessage);
            }finally {
                setSubmitting(false);
            }
        }
    });
    return (
    <div className="w-100 bg-white flex flex-col text-center gap-2 p-4 rounded 2xl">
        <h1>Bienvenido</h1>

        <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
            <input 
            type="text" 
            className="p-2 border border-gray-300 rounded" 
            placeholder="ingresar el correo" 
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            />
            <input 
            type="password" 
            className="p-2 border border-gray-300 rounded" 
            placeholder="ingresar la contraseña" 
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            />
            {formik.status && (

                <div className="my-6">
                    <span className="text-red-500">{formik.status}</span>
                </div>
                )
            }
            <button 
            type="submit" 
            className="bg-sky-500 text-white p-2 rounded"
            disabled={formik.isSubmitting}
            >Ingresar</button>
            <Link to="/auth/register">Registrate</Link>
        </form>
    </div>
    )
}
