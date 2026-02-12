import { Route, Routes } from 'react-router'
import { TodoListPage } from '../pages'
import { TodoLayout } from '../layout/TodoLayout'

export const TodoRoutes = () => {
  return (
    <TodoLayout>  
      <Routes>
          <Route path='/' element={<TodoListPage />} />
      </Routes>
    </TodoLayout>
  )
}
