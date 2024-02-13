import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Search from './Search';

function Dogs() {
  const [dogs, setDogs] = useState([]);
  const [editDog, setEditDog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/dogs')
    .then((r) => r.json())
    .then((fetchedDogs) => setDogs(fetchedDogs))
    .catch((error) => console.error('Error fetching dogs:', error));
  }, []);

//   const handleAddDog = (dog) => {
//     setDogs([...dogs, { ...dog, id: Date.now() }]);
//   };

  const handleDeleteDog = (id) => {
    setDogs(dogs.filter(dog => dog.id !== id));
  };

  const handleEditDog = (updatedDog) => {
    setDogs(dogs.map(dog => dog.id === updatedDog.id ? updatedDog : dog));
    setEditDog(null); // Clear edit state
  };

  const filteredDogs = dogs.filter(dog =>
    dog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dog.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ul>
        {filteredDogs.map((dog) => (
          <li key={dog.id}>
            <Link to={`/dogs/${dog.id}`}>
            {dog.name} ({dog.breed})
            </Link>
            <button onClick={() => setEditDog(dog)}>Edit</button>
            <button onClick={() => handleDeleteDog(dog.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {editDog && (
        <form onSubmit={(e) => {
          e.preventDefault();
          handleEditDog(editDog);
        }}>
          <input
            type="text"
            value={editDog.name}
            onChange={(e) => setEditDog({ ...editDog, name: e.target.value })}
          />
          <input
            type="text"
            value={editDog.breed}
            onChange={(e) => setEditDog({ ...editDog, breed: e.target.value })}
          />
          <button type="submit">Update Dog</button>
        </form>
      )}
      {/* Form for adding a new dog would go here */}
    </div>
  );
}

export default Dogs;

