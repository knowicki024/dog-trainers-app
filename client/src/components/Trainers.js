import React, { useState, useEffect } from 'react';

function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [editTrainer, setEditTrainer] = useState(null);
  const [formData, setFormData] = useState({ name: "", price: "" });

  useEffect(() => {
    fetch('/trainers')
      .then((r) => r.json())
      .then((fetchedTrainers) => setTrainers(fetchedTrainers))
      .catch((error) => console.error('Error fetching trainers:', error));
  }, []);

  const handleAddTrainer = (event) => {
    event.preventDefault();
    fetch('/trainers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    .then((r) => r.json())
    .then((savedTrainer) => {
      if (editTrainer) {
        setTrainers(trainers.map((trainer) => trainer.id === savedTrainer.id ? savedTrainer : trainer));
      } else {
        setTrainers([...trainers, savedTrainer]);
      }
      setFormData({ name: '', price: '' });
      setEditTrainer(null); 
    })
    .catch((error) => console.error("Error:", error));
  };

  const handleEditTrainer = (trainer) => {
    setEditTrainer(trainer);
    setFormData({ name: trainer.name, price: trainer.price });
  };

  const handleDeleteTrainer = (id) => {
    fetch(`/trainers/${id}`, {
        method: 'DELETE',
    })
    .then((r) => {
        if (r.ok) {
            setTrainers(trainers.filter((trainer) => trainer.id !== id));
        }
    })
    .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <h2>Trainers</h2>
      <form onSubmit={handleAddTrainer}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
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
