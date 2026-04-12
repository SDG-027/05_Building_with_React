const DestinationCard = ({ title, image, text, slug }) => {
  return (
    <div className="card bg-base-100 shadow-md">
      <figure>
        <img src={image} alt="Tokyo" className="h-48 w-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title hover:text-primary text-lg font-semibold">
          {title}
        </h2>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default DestinationCard;
