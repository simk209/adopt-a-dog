interface ZipcodeFilterProps {
  zipcodeInput: string;
  setZipcodeInput: React.Dispatch<React.SetStateAction<string>>;
  handleZipcodeKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  zipcodeFilter: string[];
}

const ZipcodeFilter = ({
  zipcodeFilter,
  handleZipcodeKeyDown,
  setZipcodeInput,
  zipcodeInput,
}: ZipcodeFilterProps) => {
  return (
    <div className="mb-4">
      <label htmlFor="zipcodeInput" className="block font-semibold mb-2">
        Filter by Zip Code:
      </label>
      <input 
        type="text"
        id="zipcodeInput"
        value={zipcodeInput}
        onChange={(e) => setZipcodeInput(e.target.value)}
        onKeyDown={handleZipcodeKeyDown}
        className="border border-gray-300 rounded-md px-2 py-1 w-80"
        placeholder="Enter zip code and press Enter"
      />
      {/* display applied zipcodes */}
      <div className="mt-2">
        {zipcodeFilter.map((zip, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            {zip}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ZipcodeFilter;
