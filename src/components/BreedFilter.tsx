import { useState } from "react";

interface BreedFilterProps {
  breeds: string[];
  breedFilter: string[];
  handleBreedChange: (breed: string) => void;
}

const BreedFilter = ({
  breeds,
  breedFilter,
  handleBreedChange,
}: BreedFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="mb-4 relative w-1/3 cursor-pointer">
      <div className="flex items-center " onClick={toggleDropdown}>
        <label className="font-semibold flex items-center ">
          Filter by Breed:{" "}
          {breedFilter.length > 0 && (
            <span className="ml-2">({breedFilter.length})</span>
          )}
        </label>
        <div className="w-6 h-6 mx-4 flex items-center justify-center bg-gray-200 rounded ">
          <span className={`transform ${isOpen ? "rotate-180" : ""}`}>
            &#9660;
          </span>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-full mt-2 max-h-48 overflow-y-auto border border-gray-300 rounded-md shadow-lg bg-white">
          {breeds.map((breed) => (
            <label
              key={breed}
              className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <input
                type="checkbox"
                value={breed}
                checked={breedFilter.includes(breed)}
                onChange={(e) => handleBreedChange(e.target.value)}
                className="mr-2 leading-tight"
              />
              {breed}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default BreedFilter;
