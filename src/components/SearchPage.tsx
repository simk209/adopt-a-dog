import React, { useState, useEffect } from "react";
import axios from "axios";
import DogCard from "./DogCard.tsx";
import { Dog } from "../types.ts";
import MatchedDogModal from "./MatchedDogModal.tsx";
import Filters from "./Filters.tsx";

interface DogSearchParams {
  sort: string;
  size: number;
  from: number;
  breeds?: string[];
  zipCodes?: string[];
}

const SearchPage = () => {
  const baseUrl = "https://frontend-take-home-service.fetch.com";
  const SIZE = 12;
  const [breeds, setBreeds] = useState<string[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [breedFilter, setBreedFilter] = useState<string[]>([]);
  const [zipcodeFilter, setZipcodeFilter] = useState<string[]>([]);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zipcodeInput, setZipcodeInput] = useState("");
  const [nextReq, setNextReq] = useState(null);
  const [prevReq, setPrevReq] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // fetch all breed types from the API on mount
  useEffect(() => {
    const fetchBreeds = async () => {
      const response = await axios.get(`${baseUrl}/dogs/breeds`, {
        withCredentials: true,
      });
      setBreeds(response.data);
    };
    fetchBreeds();
  }, []);

  // on mount and whenever filter/sortOrder changes (e.g.: a new breed is added), fetch the first page of dogIds that match the filters and sort order
  // upon retrieving the dogIds, post req to /dogs to retrieve dog object details
  // update "dogs" state variable with dog object details
  useEffect(() => {
    const fetchDogs = async () => {
      const params: DogSearchParams = {
        sort: `breed:${sortOrder}`,
        size: SIZE,
        from: 0,
      };

      // if breed filters were selected, use breeds query params
      if (breedFilter.length > 0) {
        params.breeds = breedFilter;
      }

      // if zipcode filters were selected, use breeds query params
      if (zipcodeFilter.length > 0) {
        params.zipCodes = zipcodeFilter;
      }

      const response = await axios.get(`${baseUrl}/dogs/search`, {
        params,
        withCredentials: true,
      });
      const dogIds = response.data.resultIds;

      // update state variables to save nextReq (query for next page of results), prevReq (query for prev page of results), total num of results, and reset page number to 1. These state variables are later used for pagination.
      setNextReq(response.data.next);
      setPrevReq(response.data.prev);
      setTotal(response.data.total);
      setPage(1);

      const detailedDogs = await fetchDogDetails(dogIds);
      setDogs(detailedDogs);
    };

    fetchDogs();
  }, [sortOrder, breedFilter, zipcodeFilter]);

  const fetchDogDetails = async (dogIds: string[]) => {
    const response = await axios.post(`${baseUrl}/dogs`, dogIds, {
      withCredentials: true,
    });
    return response.data;
  };

  // this function will be passed to a DogCard component. The dogid is used to check if the selected dog should be added or removed from the favorites list
  const handleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  // handleMatch sends a req to find the dogId for the matched dog, then a separate req is sent to get the dog object details corresponding to that id. Those details will be used to populate the MatchedDogModal.
  // handleMatch also sets isModalOpen to true in order for the modal to render
  const handleMatch = async () => {
    const response = await axios.post(`${baseUrl}/dogs/match`, favorites, {
      withCredentials: true,
    });
    const matchId = response.data.match;
    const responseMatch = await axios.post(`${baseUrl}/dogs/`, [matchId], {
      withCredentials: true,
    });
    const matchedDog = responseMatch.data[0];
    setMatchedDog(matchedDog);
    setIsModalOpen(true);
  };

  // handleBreedChange adds breed to BreedFilter unless it is already part of BreedFilter, then that breed is removed
  const handleBreedChange = (breed: string) => {
    if (breedFilter.includes(breed)) {
      setBreedFilter((prev) => prev.filter((b) => b !== breed));
    } else {
      setBreedFilter((prev) => [...prev, breed]);
    }
  };

  // onEnter, handleZipcodeKeyDown adds zipcodes to the zipcode filter, and then clears the input field
  const handleZipcodeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const zipcode = zipcodeInput.trim();
      if (zipcode && !zipcodeFilter.includes(zipcode)) {
        setZipcodeFilter((prev) => [...prev, zipcode]);
      }
      setZipcodeInput("");
    }
  };

  // handleNext checks if there are more dog objects to be rendered. If so, it uses the saved nextReq to query the next page of results. nextReq and prevReq are updated. dogs state var is updated to render the appropriate dogs. page state is incremented.
  const handleNext = async () => {
    if (total > page * 12) {
      const response = await axios.get(`${baseUrl}${nextReq}`, {
        withCredentials: true,
      });
      const dogIds = response.data.resultIds;
      setNextReq(response.data.next);
      setPrevReq(response.data.prev);
      const detailedDogs = await fetchDogDetails(dogIds);
      setDogs(detailedDogs);
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = async () => {
    if (page > 1) {
      const response = await axios.get(`${baseUrl}${prevReq}`, {
        withCredentials: true,
      });

      const dogIds = response.data.resultIds;
      setNextReq(response.data.next);
      setPrevReq(response.data.prev);
      const detailedDogs = await fetchDogDetails(dogIds);
      setDogs(detailedDogs);
      setPage((prev) => prev - 1);
    }
  };

  const clearFilters = () => {
    setBreedFilter([]);
    setZipcodeFilter([]);
  };

  return (
    <main className="p-4 flex flex-col min-h-screen">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-4xl font-semibold">Find A Dog To Adopt</h1>
        {/* matching button */}
        <button
          onClick={handleMatch}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded text-xl"
        >
          Get Matched With A Dog!
        </button>
      </header>

      {/* Modal will conditionally render dog card when client selects match button */}
      <MatchedDogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        {matchedDog && (
          <div>
            <h2 className="text-xl font-semibold mb-2">
              You matched with {matchedDog.name}!
            </h2>
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

      <Filters
        breeds={breeds}
        breedFilter={breedFilter}
        handleBreedChange={handleBreedChange}
        zipcodeFilter={zipcodeFilter}
        handleZipcodeKeyDown={handleZipcodeKeyDown}
        setZipcodeInput={setZipcodeInput}
        zipcodeInput={zipcodeInput}
        clearFilters={clearFilters}
      />

      {/* sort dropdown */}
      <section className="flex items-center space-x-4 mb-4">
        <div className="flex space-x-4 ml-auto">
          <label htmlFor="sortOrder" className="font-semibold">
            Sort by:
          </label>
          <select
            id="sortOrder"
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className="border border-gray-300 rounded-md px-2 py-1"
          >
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
      </section>

      {/* grid displaying filtered results */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center items-center">
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
      </section>

      {/* next and prev buttons */}
      <nav className="mt-4 px-32 py-6 flex justify-between">
        <button
          onClick={handlePrev}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Previous Page
        </button>

        <div>{page} of {Math.max(Math.ceil(total/SIZE),1)}</div>

        <button
          onClick={handleNext}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Next Page
        </button>
      </nav>
    </main>
  );
};

export default SearchPage;
