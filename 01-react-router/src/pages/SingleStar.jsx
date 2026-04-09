import { useEffect } from 'react';
import { useState } from 'react';
import { starsLoader } from '../data/loaders';
import { useOutletContext, useParams } from 'react-router';

export default function SingleStar() {
  // useParams extrahiert URL-Parameter (hier :slug aus /stars/:slug)
  const params = useParams();
  // Seiten für eine dynamische Detail-Ansicht
  // können entweder ihre Daten selbst fetchen...
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

  console.log(params);

  const star = stars?.find((s) => s.slug === params.slug);

  return (
    star && (
      <article className="star">
        <div>
          <img src={star.url} alt="" className="star__img" />
        </div>
        <h2 className="star__heading">{star.heading}</h2>
        <p className="star__description">{star.description}</p>
      </article>
    )
  );
}
