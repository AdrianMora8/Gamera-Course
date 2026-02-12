interface AuthLayoutProps {
    children?: React.ReactNode;
}


export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="min-h-screen bg-sky-300 max-w-full flex flex-col justify-center items-center">
        {children}
    </main>
  )
}
