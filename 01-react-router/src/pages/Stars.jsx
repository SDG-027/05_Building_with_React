import { useEffect } from 'react';
import { useState } from 'react';
import { starsLoader } from '../data/loaders';
import Card from '../components/Card';
import { useOutletContext } from 'react-router';

export default function Stars() {
  // Eine Seite kann entweder ihre eigenen Daten fetchen ---
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
  // oder useOutletContext holt sich Daten vom Parent-Layout (MainLayout) aus dem 'context'-Prop
  const stars = useOutletContext();

  return (
    <div className="grid">
      {stars?.map((s) => (
        <Card key={s.id} star={s} />
      ))}
    </div>
  );
}
