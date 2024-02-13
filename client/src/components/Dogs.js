import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

function Dogs() {
  const [dogs, setDogs] = useState([]);
  const [editDog, setEditDog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    owner: "",
    breed: "",
  });

  useEffect(() => {
    fetch('/dogs')
      .then((r) => r.json())
      .then((fetchedDogs) => setDogs(fetchedDogs))
      .catch((error) => console.error('Error fetching dogs:', error));
  }, []);

  const handleAddDog = (event) => {
    event.preventDefault();
    fetch('/dogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((newDog) => {
        setDogs([...dogs, newDog]);
        setFormData({ name: "", owner: "", breed: "" });
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleDeleteDog = (id) => {
    fetch(`/dogs/${id}`, {
      method: 'DELETE',
    })
      .then((r) => {
        if (r.ok) {
          setDogs(dogs.filter((dog) => dog.id !== id));
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  const filteredDogs = dogs.filter(dog =>
    dog.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          // handleEditDog function to be implemented for editing dogs
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
      {/* Form for adding a new dog */}
      <form onSubmit={handleAddDog}>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Dog's name"
        />
        <input
          type="text"
          value={formData.breed}
          onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
          placeholder="Dog's breed"
        />
        <input
          type="text"
          value={formData.owner}
          onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
          placeholder="Owner's name"
        />
        <button type="submit">Add Dog</button>
      </form>
    </div>
  );
}

export default Dogs;
