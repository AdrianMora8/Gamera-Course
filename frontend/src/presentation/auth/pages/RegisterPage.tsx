import { useFormik } from "formik"
import { useAuthStore } from "../../../store/hooks/useAuthStore";
import { catchError } from "../../../helpers/catchError";
import { Link } from "react-router";



export const RegisterPage = () => {

    const {startRegister} = useAuthStore();

    const formik = useFormik({
      initialValues:{
        name:"sssssss",
        lastName: "ssssssssss",
        email: "arthurchavez2399@hotmail.com",
        password:"123456"
      },
      onSubmit:async (values, {setSubmitting, setStatus})=> {

        setStatus(null);
        try {
          await startRegister(values);
        } catch (error: unknown) {
          const errorMessage = catchError(error);
          setStatus(errorMessage);
        }finally {
          setSubmitting(false);
      }
    }
  });
  return (
    <div className="w-100 bg-white flex flex-col text-center gap-2 p-4 rounded 2xl">
        <h1>Register</h1>
      <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
        <input 
        type="text" 
        name="name"
        placeholder="Name" 
        className="p-2 border border-gray-300 rounded" 
        value={formik.values.name}
        onChange={formik.handleChange}
        />
        <input 
        type="text" 
        name="lastName"
        placeholder="LastName" 
        className="p-2 border border-gray-300 rounded" 
        value={formik.values.lastName}
        onChange={formik.handleChange}
        />
        <input 
        type="email" 
        name="email"
        placeholder="Email" 
        className="p-2 border border-gray-300 rounded" 
        value={formik.values.email}
        onChange={formik.handleChange}
        />
        <input 
        type="password" 
        name="password"
        placeholder="Password"
        className="p-2 border border-gray-300 rounded" 
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
        >Registrarse</button>
        <Link to="/auth/login">Ya tienes una cuenta?</Link>
      </form>
    </div>
  )
}
