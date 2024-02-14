import React, { useState, useEffect } from 'react';

function Trainers({ updateTrainers }) {
  const [trainers, setTrainers] = useState([]);
  const [editTrainer, setEditTrainer] = useState(null);
  const [formData, setFormData] = useState({ name: "", price: "", specialty: "" }); // Assume specialty is part of your data model

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
      setFormData({ name: '', price: '', specialty: '' });
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
        price: trainer.price,
        specialty: trainer.specialty // Assuming specialty is part of your model
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

  return (
    <div>
      <h2>Trainers</h2>
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
        {/* Assuming you want to add/edit specialty */}
        <input
          type="text"
          name="specialty"
          placeholder="Specialty"
          value={formData.specialty}
          onChange={handleInputChange}
        />
        <button type="submit">{editTrainer ? 'Update Trainer' : 'Add Trainer'}</button>
      </form>
      <ul>
        {trainers.map(trainer => (
          <li key={trainer.id}>
            {trainer.name} - {trainer.specialty}
            <button onClick={() => handleEditTrainer(trainer)}>Edit</button>
            <button onClick={() => handleDeleteTrainer(trainer.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Trainers;
