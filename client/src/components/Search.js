import React, { useState } from 'react';

function DogSearch() {
  const [query, setQuery] = useState('');
  const [filteredDogs, setFilteredDogs] = useState([]);

  const handleSearch = async (event) => {
    const value = event.target.value.toLowerCase();
    setQuery(value);

    try {
      const response = await fetch(`http://127.0.0.1:5555/dogs?search=${value}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const dogs = await response.json();
      setFilteredDogs(dogs);
    } catch (error) {
      console.error('Failed to fetch dogs', error);
      setFilteredDogs([]); 
    }
  };

  return (
    <div>
      <h2>Search Dogs</h2> 
      <input
        type="text"
        placeholder="Search for dogs by name..."
        value={query}
        onChange={handleSearch}
      />
      <div>
        {filteredDogs.length > 0 && (
          <ul>
            {filteredDogs.map((dog) => (
              <li key={dog.id}>{dog.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DogSearch;


