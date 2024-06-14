interface DogCardProps {
  id: string;
  name: string;
  age: number;
  breed: string;
  zipcode: string;
  img: string;
  isFavorite: boolean;
  handleFavorite: (id: string) => void;
}

// DogCard shows relevant dog object info, and inherits functionality to update favorites state variable via handleFavorite
// (handleFavorite is defined in SearchPage)

const DogCard = ({
  id,
  name,
  age,
  breed,
  zipcode,
  img,
  isFavorite,
  handleFavorite,
}: DogCardProps) => {
  return (
    <article className="max-w-xs w-72 rounded overflow-hidden shadow-lg">
      <img className="w-full h-80 object-cover" src={img} alt={name} />
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2">{name}</h2>
        <p className="text-gray-700 text-base">
          Age: {age}
          <br />
          Breed: {breed}
          <br />
          Zipcode: {zipcode}
        </p>
        <button
          aria-label={isFavorite ? "Unfavorite this dog" : "Favorite this dog"}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleFavorite(id)}
        >
          {isFavorite ? "Unfavorite" : "Favorite"}
        </button>
      </div>
    </article>
  );
};

export default DogCard;
