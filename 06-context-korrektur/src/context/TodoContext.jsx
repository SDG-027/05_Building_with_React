import { createContext } from 'react';
import { useState } from 'react';

// createContext erstellt ein neues Context-Objekt.
// Komponenten, die diesen Context konsumieren, lesen den aktuellen Wert
export const TodoContext = createContext();

// TodoProvider ist die "Schaltzentrale" der App.
// Er hält den gesamten geteilten State und stellt ihn allen
// Kind-Komponenten zur Verfügung — ganz ohne Props durchzureichen.
export default function TodoProvider({ children }) {
  // State für die Todo-Liste. Die Initialisierungsfunktion (Lazy Initial State)
  // wird nur einmal beim ersten Render ausgeführt und liest gespeicherte
  // Todos aus dem localStorage — oder startet mit einem leeren Array.
  const [todos, setTodos] = useState(() =>
    localStorage.getItem('todos')
      ? JSON.parse(localStorage.getItem('todos'))
      : []
  );

  // State für den aktiven Filter ('all', 'active', 'completed').
  const [filter, setFilter] = useState('all');

  // Schaltet den completed-Status eines Todos um.
  // Wir übergeben eine Updater-Funktion an setTodos, um sicherzustellen,
  // dass wir immer mit dem aktuellsten State arbeiten (functional update form).
  const toggleTodo = (id) => {
    setTodos((prevTodos) => {
      // map() erstellt ein neues Array — wir verändern nie das Original direkt (Immutability).
      // Nur das Todo mit der passenden id bekommt den umgeschalteten completed-Wert.
      const toDos = prevTodos.map((todo) => {
        if (todo.id === id) {
          // Spread-Operator: alle Felder kopieren, nur 'completed' überschreiben
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });

      localStorage.setItem('todos', JSON.stringify(toDos));
      return toDos;
    });
  };

  // Hilfsfunktion zum Setzen des Filters — könnte auch direkt setFilter
  // verwendet werden, ist hier aber als benannte Funktion im Context
  // bereitgestellt, um die API nach außen konsistent zu halten.
  const setFilterInView = (filter) => {
    setFilter(filter);
  };

  // Das value-Objekt enthält alles, was Kind-Komponenten brauchen:
  // State-Werte (todos, filter) und Funktionen zum Verändern des States.
  // Nur was hier drin steht, ist für den Rest der App sichtbar.
  const value = {
    todos,
    setTodos,
    filter,
    toggleTodo,
    setFilterInView,
  };

  // Der Provider umschließt alle children und stellt ihnen den Context bereit.
  // Jede Komponente im Baum unterhalb dieses Providers kann den Context
  // konsumieren — ohne dass Props manuell weitergegeben werden müssen.
  return <TodoContext value={value}>{children}</TodoContext>;
}

// Custom Hook als bequeme Abkürzung für useContext(TodoContext).
// Statt in jeder Komponente useContext(TodoContext) zu schreiben,
// reicht ein einfaches: const { todos, toggleTodo } = useTodos()
export function useTodos() {
  return useContext(TodoContext);
}
