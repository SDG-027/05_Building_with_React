import { useContext } from 'react';
import { useState, createContext } from 'react';
import { BookingContext } from './BookingContext';
import { useEffect } from 'react';

export const ThemeContext = createContext('halloween');

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('cyberpunk');
  const { bookingState } = useContext(BookingContext);

  useEffect(() => {
    console.log('FIRED');
    // fetch(); // Etwas tun, wenn sich der Premium-State verändert hat
  }, [bookingState.premium]);

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
}
