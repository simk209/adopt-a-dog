// src/components/Filters.tsx
import React from 'react';
import BreedFilter from './BreedFilter';
import ZipcodeFilter from './ZipcodeFilter';

interface FiltersProps {
  breeds: string[];
  breedFilter: string[];
  handleBreedChange: (breed: string) => void;
  zipcodeFilter: number[];
  handleZipcodeKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setZipcodeInput: React.Dispatch<React.SetStateAction<string>>;
  zipcodeInput: string;
  clearFilters: () => void;
}

const Filters= ({
  breeds,
  breedFilter,
  handleBreedChange,
  zipcodeFilter,
  handleZipcodeKeyDown,
  setZipcodeInput,
  zipcodeInput,
  clearFilters,
}:FiltersProps) => {
  return (
    <div className="filters-container">
      <BreedFilter
        breeds={breeds}
        breedFilter={breedFilter}
        handleBreedChange={handleBreedChange}
      />
      <ZipcodeFilter
        zipcodeFilter={zipcodeFilter}
        handleZipcodeKeyDown={handleZipcodeKeyDown}
        setZipcodeInput={setZipcodeInput}
        zipcodeInput={zipcodeInput}
      />
      <button onClick={clearFilters} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Clear Filters
      </button>
    </div>
  );
};

export default Filters;
