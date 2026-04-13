import { Outlet } from 'react-router';
import { Footer, NavBar } from '../components';
import { useEffect, useState } from 'react';

export default function MainLayout() {
  const [destinations, setDestinations] = useState(null);

  useEffect(() => {
    fetch('/travel.json')
      .then((res) => res.json())
      .then((data) => setDestinations(data));
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="container mx-auto mb-auto px-4 py-8">
        {destinations ? (
          <Outlet context={destinations} />
        ) : (
          <span className="loading loading-dots loading-xl"></span>
        )}
      </main>
      <Footer />
    </div>
  );
}
