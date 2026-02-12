import { useFormik } from "formik";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, description: string) => void;
  initialTitle: string;
  initialDescription: string;
}

export const EditTodoModal = ({ isOpen, onClose, onSave, initialTitle, initialDescription }: Props) => {
  const formik = useFormik({
    initialValues: {
      title: initialTitle,
      description: initialDescription
    },
    enableReinitialize: true, 
    onSubmit: (values) => {
      onSave(values.title, values.description);
      onClose();
    }
  });

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Editar TODO</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={formik.values.title}
            onChange={formik.handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
          <input
            type="text"
            name="description"
            placeholder="Descripción"
            value={formik.values.description}
            onChange={formik.handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
          
          <div className="flex gap-3 pt-2">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="flex-1 bg-sky-500 text-white px-6 py-2 rounded hover:bg-sky-600 transition-colors"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
