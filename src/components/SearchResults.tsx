// src/components/SearchPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DogCard from './DogCard.tsx';
import {Dog} from '../types.ts' 
import MatchedDogModal from './MatchedDogModal.tsx';
import BreedFilter from './BreedFilter.tsx';

const SearchResults = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);
  const [breedFilter, setBreedFilter] = useState<string[]>([]);
  const [zipcodeFilter, setZipcodeFilter] = useState<number[]>([])
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zipcodeInput, setZipcodeInput] = useState('');
  console.log("zipcodeFilter",zipcodeFilter);
//   fetch all breed types 
  useEffect(() => {
    const fetchBreeds = async () => {
      const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds', { withCredentials: true });
      setBreeds(response.data);
    };
    fetchBreeds();
  }, []);
  
// filter the search results, passing in query params for breed, sort, size, and from
// upon retrieving the dogIds, post req to /dogs to get dog objects
// update dogs state with dogdetails
  useEffect(() => {
    const fetchDogs = async () => {
      const params = {
        sort: `breed:${sortOrder}`,
        size: 12,
        from: page * 12,
      };

      if (breedFilter.length > 0) {
        params.breeds = breedFilter;
      }

      if (zipcodeFilter.length > 0){
        params.zipCodes = zipcodeFilter
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
  }, [sortOrder, page, breedFilter, zipcodeFilter]);

  // const nextPage = ()=>{

  // }

  
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
    setIsModalOpen(true)
  };

  const handleBreedChange = (breed: string) => {
    if (breedFilter.includes(breed)) {
      setBreedFilter((prev) => prev.filter((b) => b !== breed));
    } else {
      setBreedFilter((prev) => [...prev, breed]);
    }
    setPage(0); // Reset page when filter changes
  };

  const handleZipcodeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const zipcode = parseInt(zipcodeInput.trim());
      if (!isNaN(zipcode) && !zipcodeFilter.includes(zipcode)) {
        setZipcodeFilter((prev) => [...prev, zipcode]);
      }
      setZipcodeInput(''); // Clear the input field
    }
  };
  const clearFilters = () => {
    setBreedFilter([]); 
    setZipcodeFilter([])
  };

  return (

    
    <div className="p-4 flex flex-col min-h-screen">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-4xl font-semibold">Find A Dog To Adopt</h1>
        {/* matching button */}
        <button onClick={handleMatch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded text-xl">Get Matched With A Dog!</button>
      </div>

      {/* Modal will conditionally render dog card when client selects match button */}
      <MatchedDogModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {matchedDog && (
          <div>
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
      </MatchedDogModal>

      {/* breed filter drop down */}
      <BreedFilter breeds={breeds} breedFilter={breedFilter} handleBreedChange={handleBreedChange} clearFilters={clearFilters} />

      {/* zip code input */}
      <div className="mb-4">
        <label htmlFor="zipcodeInput" className="block font-semibold mb-2">Filter by Zip Code:</label>
        <input
          type="text"
          id="zipcodeInput"
          value={zipcodeInput}
          onChange={(e) => setZipcodeInput(e.target.value)}
          onKeyDown={handleZipcodeKeyDown}
          className="border border-gray-300 rounded-md px-2 py-1 w-full"
          placeholder="Enter zip code and press Enter"
        />
        {/* display applied zipcodes */}
        <div className="mt-2">
          {zipcodeFilter.map((zip, index) => (
            <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {zip}
            </span>
          ))}
        </div>
      </div>
      {/* clear filters */}
      <button onClick={clearFilters}>Clear Filters</button>

      

      {/* sort dropdown */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex space-x-4 ml-auto">
          <label htmlFor="sortOrder" className="font-semibold">Sort by:</label>
          <select id="sortOrder" onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')} className="border border-gray-300 rounded-md px-2 py-1">
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
      </div>

      {/* grid displaying filtered results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center items-center">
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


      {/* next and prev buttons */}
      <div className="mt-4 px-32 py-6 flex justify-between">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 0))} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Previous Page</button>
        <button onClick={() => setPage((prev) => prev + 1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Next Page</button>
      </div>
    </div>
  );
};

export default SearchResults;
