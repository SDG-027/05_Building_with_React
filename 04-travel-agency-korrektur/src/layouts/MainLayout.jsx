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
        <span className="">CONTENT</span>
      </main>
      <Footer />
    </div>
  );
}
