import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { TodoReducerContext } from '../context/TodoReducerContext';

const ToDoItem = ({ todo }) => {
  // const { toggleTodo } = useContext(TodoContext);
  const { toggleTodo } = useContext(TodoReducerContext);

  return (
    <li className="mb-2 flex items-center">
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="mr-2"
        />
        {todo.text}
      </label>
    </li>
  );
};

export default ToDoItem;
