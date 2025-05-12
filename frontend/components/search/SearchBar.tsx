import { ChangeEvent } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  value: string;
}

export default function SearchBar({ onSearch, value }: SearchBarProps) {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar productos..."
          onChange={handleSearch}
          value={value}
          className="w-full px-4 py-2 text-gray-200 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-400"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
} 