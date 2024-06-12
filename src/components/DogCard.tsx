// src/components/DogCard.tsx
import React from 'react';

interface DogCardProps {
  id: string;
  name: string;
  age: number;
  breed: string;
  img: string;
  isFavorite: boolean;
  handleFavorite: (id: string) => void;
  zipcode: string
}

const DogCard: React.FC<DogCardProps> = ({ id, name, age, breed, img, isFavorite, handleFavorite, zipcode }) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg">
      <img className="w-full h-40 object-cover" src={img} alt={name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">
          Age: {age}<br />
          Breed: {breed}<br />
          Zipcode: {zipcode}
        </p>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleFavorite(id)}
        >
          {isFavorite ? 'Unfavorite' : 'Favorite'}
        </button>
      </div>
    </div>
  );
};

export default DogCard;

