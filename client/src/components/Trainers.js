import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

function Trainers({ updateTrainers, user }) {
  const [trainers, setTrainers] = useState([]);
  const [editTrainer, setEditTrainer] = useState(null);
  const [formData, setFormData] = useState({ name: "", price: ""}); // Assume specialty is part of your data model
  const [priceAsc, setPriceAsc] = useState(true)
  useEffect(() => {
    fetch('/trainers')
      .then((response) => response.json())
      .then((fetchedTrainers) => setTrainers(fetchedTrainers))
      .catch((error) => console.error('Error fetching trainers:', error));
  }, []);

  const handleAddOrUpdateTrainer = (event) => {
    event.preventDefault();
    const method = editTrainer ? 'PATCH' : 'POST';
    const endpoint = editTrainer ? `/trainers/${editTrainer}` : '/trainers';

    fetch(endpoint, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then((savedTrainer) => {
      if (editTrainer) {
        setTrainers(trainers.map((trainer) => trainer.id === savedTrainer.id ? savedTrainer : trainer));
      } else {
        setTrainers([...trainers, savedTrainer]);
      }
      setFormData({ name: '', price: "" });
      setEditTrainer(null);
    })
    .catch((error) => console.error("Error:", error));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditTrainer = (trainer) => {
    setFormData({
        name: trainer.name,
        price: trainer.price
    });
    setEditTrainer(trainer.id);
  };

  const handleDeleteTrainer = (id) => {
    fetch(`/trainers/${id}`, {
        method: 'DELETE',
    })
    .then((response) => {
        if (response.ok) {
            setTrainers(trainers.filter((trainer) => trainer.id !== id));
        }
    })
    .catch((error) => console.error("Error:", error));
  };

  const handleClick = () =>{
    setPriceAsc(priceAsc => !priceAsc)
  }

  const sortedTrainersByAsc = [...trainers].sort((a, b) => a.price - b.price)
  const sortedTrainersByDsc = [...trainers].sort((a, b) => b.price - a.price)

  const filteredTrainers = priceAsc ? sortedTrainersByAsc : sortedTrainersByDsc;

  return (
    <div>
      <h2>Trainers</h2>
      <button onClick={(handleClick)}>{priceAsc? 'Filter Price High to Low' : 'Filter Price Low to High'}</button>
      <form onSubmit={handleAddOrUpdateTrainer}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
        />
       
        <button type="submit">{editTrainer ? 'Update Trainer' : 'Add Trainer'}</button>
      </form>
      <ul>
        {filteredTrainers.map(trainer => (
          
          <li key={trainer.id}>
          
              <p>
              <Link
              to={user ? `/trainers/${trainer.id}` : '/'}
              onClick={() => {
                if (!user) {
                  alert('Please log in to view trainer details.');
                }
              }}
          >
                {trainer.name} (${trainer.price})
                </Link>

              </p>
            <button onClick={() => handleEditTrainer(trainer)}>Edit</button>
            <button onClick={() => handleDeleteTrainer(trainer.id)}>Delete</button>
          </li>

        ))}
      </ul>
    </div>
  );
}

export default Trainers;
