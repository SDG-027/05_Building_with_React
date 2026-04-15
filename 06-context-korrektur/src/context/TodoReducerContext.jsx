import { createContext, useEffect, useReducer } from 'react';

// init() wird von useReducer einmalig aufgerufen, um den Startzustand zu berechnen.
// So landen die localStorage-Daten direkt im ersten Render
//  — kein useEffect, kein leerer Zwischenstand. Und keine Side Effects im Reducer selbst
function init() {
  return {
    todos: JSON.parse(localStorage.getItem('todos')) || [],
    filter: 'all', // all, completed, active
  };
}

// Der Reducer ist eine *reine Funktion*: sie bekommt den aktuellen State und
// eine Action, und gibt einen *neuen* State zurück — sie verändert nie den alten direkt.
// action: { type, payload }
function reducer(state, action) {
  // switch prüft, welche Art von Aktion ausgelöst wurde, und reagiert entsprechend.
  switch (action.type) {
    case 'add_todo': {
      // Neues Todo-Objekt aus dem übergebenen Text (payload) erstellen.
      // Date.now() liefert einen eindeutigen numerischen Zeitstempel als id.
      const newTodo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      // Neues Todo *vorne* in die Liste einfügen (neueste zuerst).
      // Spread-Operator: alten State kopieren, todos-Array ersetzen.
      const todos = [newTodo, ...state.todos];
      return { ...state, todos };
    }
    case 'filter_todo': {
      // Nur den filter-Wert im State aktualisieren, todos bleiben unverändert.
      return { ...state, filter: action.payload };
    }
    case 'toggle_todo': {
      // Das Todo mit der passenden id umschalten, alle anderen unverändert lassen.
      const todos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      return { ...state, todos };
    }

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

// Warum das ganze kopieren? React registriert ein verändertes Object nicht am Inhalt,
// sondern an seiner Speicheraddresse, deshalb müssen wir auch bei kleinen Veränderungen neue Objekte
// erzeugen, damit React ein re-render auslöst.

export const TodoReducerContext = createContext();

export default function TodoReducerProvider({ children }) {
  // Das dritte Argument (init) ist die Initializer-Funktion.
  // useReducer ruft sie einmalig auf und verwendet ihr Ergebnis als Startzustand.
  // 'undefined' als zweites Argument, weil init nun den Grundzustand herstellt.
  const [state, dispatch] = useReducer(reducer, undefined, init);

  // Action-Creator-Funktionen: verstecken dispatch nach außen und
  // bieten eine sprechende API für die Konsumenten.
  function addTodo(todoStr) {
    dispatch({ type: 'add_todo', payload: todoStr });
  }

  function setFilterInView(filterStr) {
    dispatch({ type: 'filter_todo', payload: filterStr });
  }

  function toggleTodo(todoId) {
    dispatch({ type: 'toggle_todo', payload: todoId });
  }

  // Immer wenn sich state.todos ändert, wird der aktuelle Stand gespeichert.
  useEffect(() => {
    if (state.todos.length === 0) return;
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <TodoReducerContext
      value={{
        todos: state.todos,
        filter: state.filter,
        addTodo,
        setFilterInView,
        toggleTodo,
      }}
    >
      {children}
    </TodoReducerContext>
  );
}
