import { useEffect } from 'react';
import { useReducer } from 'react';
import { createContext } from 'react';

const initialState = {
  destinations: [],
  premium: false,
};

export const BookingContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case 'add_destination': {
      if (state.destinations.includes(action.payload)) return state;
      const destinations = [...state.destinations, action.payload];
      const premium = destinations.length >= 2;
      const newState = { ...state, destinations, premium };
      return newState;
    }
    case 'remove_destination': {
      const destinations = state.destinations.filter(
        (d) => d !== action.payload
      );
      const premium = destinations.length >= 2;
      return { ...state, destinations, premium };
    }

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export default function BookingProvider({ children }) {
  const [bookingState, dispatch] = useReducer(reducer, initialState);

  function addDestination(payload) {
    dispatch({ type: 'add_destination', payload });
  }

  function removeDestination(payload) {
    dispatch({ type: 'remove_destination', payload });
  }

  useEffect(() => {
    console.log(bookingState);
  }, [bookingState]);

  return (
    <BookingContext value={{ bookingState, addDestination, removeDestination }}>
      {children}
    </BookingContext>
  );
}
