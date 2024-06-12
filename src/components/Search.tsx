// src/components/SearchPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DogCard from './DogCard';

const SearchPage = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);
  const [breedFilter, setBreedFilter] = useState<string | null>(null);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);

  useEffect(() => {
    const fetchBreeds = async () => {
      const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds', { withCredentials: true });
      setBreeds(response.data);
    };

    fetchBreeds();
  }, []);

  useEffect(() => {
    const fetchDogs = async () => {
      const params: Record<string, unknown> = {
        sort: `breed:${sortOrder}`,
        size: 12,
        from: page * 12,
      };

      if (breedFilter) {
        params.breeds = [breedFilter];
      }

      const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/search', {
        params,
        withCredentials: true,
      });
      const dogIds = response.data.resultIds;
      const detailedDogs = await fetchDogDetails(dogIds);
      setDogs(detailedDogs);
    };

    fetchDogs();
  }, [sortOrder, page, breedFilter]);

  const fetchDogDetails = async (dogIds: string[]) => {
    const response = await axios.post('https://frontend-take-home-service.fetch.com/dogs', dogIds, { withCredentials: true });
    return response.data;
  };

  const handleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]));
  };

  const handleMatch = async () => {
    const response = await axios.post('https://frontend-take-home-service.fetch.com/dogs/match', favorites, { withCredentials: true });
    const matchId = response.data.match;
    const responseMatch = await axios.post('https://frontend-take-home-service.fetch.com/dogs', [matchId], { withCredentials: true });
    const matchedDog = responseMatch.data[0];
    setMatchedDog(matchedDog);
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Search Dogs</h1>
        <button onClick={handleMatch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Generate Match</button>
      </div>
      {matchedDog && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Matched Dog</h2>
          <DogCard
            key={matchedDog.id}
            id={matchedDog.id}
            name={matchedDog.name}
            age={matchedDog.age}
            breed={matchedDog.breed}
            zipcode={matchedDog.zip_code}
            img={matchedDog.img}
            isFavorite={favorites.includes(matchedDog.id)}
            handleFavorite={handleFavorite}
          />
        </div>
      )}
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex space-x-4">
          <label htmlFor="sortOrder" className="font-semibold">Sort by:</label>
          <select id="sortOrder" onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')} className="border border-gray-300 rounded-md px-2 py-1">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className="flex space-x-4">
          <button onClick={() => setPage((prev) => Math.max(prev - 1, 0))} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Previous Page</button>
          <button onClick={() => setPage((prev) => prev + 1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Next Page</button>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="breedFilter" className="font-semibold">Filter by Breed:</label>
        <select id="breedFilter" onChange={(e) => setBreedFilter(e.target.value || null)} className="border border-gray-300 rounded-md px-2 py-1">
          <option value="">All Breeds</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>{breed}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dogs.map((dog) => (
          <DogCard
            key={dog.id}
            id={dog.id}
            name={dog.name}
            age={dog.age}
            breed={dog.breed}
            zipcode={dog.zip_code}
            img={dog.img}
            isFavorite={favorites.includes(dog.id)}
            handleFavorite={handleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
