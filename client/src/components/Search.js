import React, { useState } from 'react';

// Example dog data
const dogsData = [
  { id: 1, name: 'Buddy' },
  { id: 2, name: 'Charlie' },
  { id: 3, name: 'Max' },
  { id: 4, name: 'Bella' },
  // Add more dogs as needed
];

function DogSearch() {
  const [query, setQuery] = useState('');
  const [filteredDogs, setFilteredDogs] = useState(dogsData);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setQuery(value);

    const filtered = dogsData.filter(dog => dog.name.toLowerCase().includes(value));
    setFilteredDogs(filtered);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for dogs by name..."
        value={query}
        onChange={handleSearch}
      />
      <div>
        {filteredDogs.length > 0 ? (
          <ul>
            {filteredDogs.map((dog) => (
              <li key={dog.id}>{dog.name}</li>
            ))}
          </ul>
        ) : (
          <p>No dogs found.</p>
        )}
      </div>
    </div>
  );
}

export default DogSearch;
