import { useEffect, useState } from 'react';
import Card from './components/Card';
import Header from './components/Header';
import { starsLoader } from './data/loaders';

function App() {
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
      <div className="grid">
        {stars?.map((s) => (
          <Card star={s} />
        ))}
      </div>
      <footer>&copy; footerbla</footer>
    </div>
  );
}

export default App;
