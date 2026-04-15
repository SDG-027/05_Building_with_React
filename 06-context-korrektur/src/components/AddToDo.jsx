import { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import { TodoReducerContext } from '../context/TodoReducerContext';

const AddToDo = () => {
  const [newTodo, setNewTodo] = useState('');

  // const { setTodos } = useContext(TodoContext);
  const { addTodo } = useContext(TodoReducerContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return alert('Please enter a to-do item');
    addTodo(newTodo);

    setNewTodo('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex">
      <input
        type="text"
        name="todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new to-do"
        className="mr-2 flex-1 rounded border px-2 py-1"
      />
      <button
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Add
      </button>
    </form>
  );
};

export default AddToDo;
