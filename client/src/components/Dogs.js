import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';



function Dogs({user}) {
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
      <ul>

        <ListGroup>
          {filteredDogs.map((dog) => (
            <ListGroup.Item key={dog.id}>
              <Link to={user ? `/dogs/${dog.id}` : '/'}
                    onClick={() => {
                    if (!user) {
                            alert('Please log in to view dog details.');
                            }}}
              >
              {dog.name} ({dog.breed})
              </Link>
              <Button onClick={() => setEditDog(dog)} variant="secondary">Edit</Button>{' '}
              <Button onClick={() => handleDeleteDog(dog.id)} variant="secondary">Delete</Button>{' '}
            </ListGroup.Item>
          ))}
        </ListGroup>

      </ul>
      
      {/* Form for adding a new dog would go here */}
    </div>
  );
}
export default Dogs;
