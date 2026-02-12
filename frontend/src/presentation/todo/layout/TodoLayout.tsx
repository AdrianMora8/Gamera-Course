
    interface Props {
        children: React.ReactNode;
    }

export const TodoLayout = ({children}: Props) => {
    return (
    <main>
        {children}
    </main>
    )

    
}
