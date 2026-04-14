import { Outlet } from 'react-router';
import { Footer, NavBar } from '../components';
import { Suspense } from 'react';
import ThemeProvider from '../context/ThemeContext';
import { useContext } from 'react';
import { BookingContext } from '../context/BookingContext';

const destinationsPromise = fetch('/travel.json').then((res) => res.json());

export default function MainLayout() {
  const { bookingState } = useContext(BookingContext);
  return (
    <ThemeProvider>
      <div
        className="flex min-h-screen flex-col"
        data-theme={bookingState.premium ? 'cyberpunk' : 'halloween'}
      >
        <NavBar />
        <main className="container mx-auto mb-auto px-4 py-8">
          <Suspense
            fallback={<span className="loading loading-dots loading-xl"></span>}
          >
            <Outlet context={destinationsPromise} />
            {/* async Outlet*/}
          </Suspense>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
