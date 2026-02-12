import { useFormik } from "formik";
import { Navbar } from "../components/Navbar";
import { useTodoStore } from "../../../store/hooks/useTodoStore";
import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { useTodoSocket } from "../../../store/hooks/useTodoSocket";
import { EditTodoModal } from "../components/EditTodoModal";


export const TodoListPage = () => {
  const { todos, createTodo, editTodo, toggleComplete, removeTodo, getAllTodos } = useTodoStore();

  useTodoSocket();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<{ id: string; title: string; description: string } | null>(null);
  const handleOpenEditModal = (id: string, title: string, description: string) => {
    setEditingTodo({ id, title, description });
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingTodo(null);
  };
  const handleSaveEdit = async (title: string, description: string) => {
    if (editingTodo) {
      await editTodo(editingTodo.id, title, description);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: ""
    },
    onSubmit: (values, { resetForm }) => {
      createTodo(values.title, values.description);
      resetForm();
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="ml-56">
        <Navbar />
        
        <div className="max-w-4xl mx-auto p-6">
          
          <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <input
              type="text"
              name="title"
              placeholder="Título"
              value={formik.values.title}
              onChange={formik.handleChange}
              className="border border-gray-300 rounded px-4 py-2 w-full mb-3"
            />
            <input
              type="text"
              name="description"
              placeholder="Descripción"
              value={formik.values.description}
              onChange={formik.handleChange}
              className="border border-gray-300 rounded px-4 py-2 w-full mb-3"
            />
            <button type="submit" className="bg-sky-500 text-white px-6 py-2 rounded w-full hover:bg-sky-600 transition-colors">
              Agregar
            </button>
          </form>

          <div className="flex flex-col gap-3">
            {todos.map((todo) => (
              <div key={todo.id} className="bg-white p-4 rounded-lg shadow-md flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete({id: todo.id})}
                  className="mt-1 w-5 h-5"
                  />
                <div className="flex-1">
                  <h3 className={todo.completed ? 'line-through' : ''}>{todo.title}</h3>
                  <p className="text-sm text-gray-600">{todo.description}</p>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleOpenEditModal(todo.id, todo.title, todo.description)} 
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => removeTodo(todo.id)} 
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <EditTodoModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleSaveEdit}
        initialTitle={editingTodo?.title || ""}
        initialDescription={editingTodo?.description || ""}
      />
    </div>
  )
}
