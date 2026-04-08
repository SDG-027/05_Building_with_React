const Card = ({ star }) => {
  const { url, heading, description } = star;

  return (
    <article className="star">
      <div>
        <img src={url} alt={heading} className="star__img" />
      </div>
      <h2 className="star__heading">{heading}</h2>
      <p className="star__description">{description}</p>
    </article>
  );
};

export default Card;
