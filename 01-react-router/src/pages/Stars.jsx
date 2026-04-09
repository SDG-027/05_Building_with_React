import { useEffect } from 'react';
import { useState } from 'react';
import { starsLoader } from '../data/loaders';
import Card from '../components/Card';
import { useOutletContext } from 'react-router';

export default function Stars() {
  // const [stars, setStars] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await starsLoader();
  //     console.log(data);
  //     setStars(data);
  //   };
  //   fetchData();
  // }, []);
  //

  const stars = useOutletContext();

  return (
    <div className="grid">
      {stars?.map((s) => (
        <Card key={s.id} star={s} />
      ))}
    </div>
  );
}
