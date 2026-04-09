import { useEffect } from 'react';
import Header from '../components/Header';
import { useState } from 'react';
import { starsLoader } from '../data/loaders';
import { Outlet } from 'react-router';

export default function MainLayout() {
  const [stars, setStars] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await starsLoader();
      console.log(data);
      setStars(data);
    };
    fetchData();
  }, []);

  return (
    <div className="body">
      <Header />
      <Outlet context={stars} />
      <footer>&copy; footerbla</footer>
    </div>
  );
}
