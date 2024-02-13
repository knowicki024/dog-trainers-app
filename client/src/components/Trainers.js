import React, { useState, useEffect } from 'react';

function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [editTrainer, setEditTrainer] = useState(null);
  const [newTrainer, setNewTrainer] = useState({ name: '', price: '' });

  useEffect(() => {
    fetch('/trainers')
      .then((r) => r.json())
      .then((fetchedTrainers) => setTrainers(fetchedTrainers))
      .catch((error) => console.error('Error fetching trainer:', error)); // Removed the semicolon before .catch
  }, []);


  const handleAddOrUpdateTrainer = (e) => {
    e.preventDefault();
    if (editTrainer) {
      // Update trainer
      setTrainers(trainers.map(trainer => trainer.id === editTrainer.id ? { ...editTrainer } : trainer));
    } else {
      // Add new trainer
      const newId = trainers.length > 0 ? Math.max(...trainers.map(t => t.id)) + 1 : 1;
      setTrainers([...trainers, { ...newTrainer, id: newId }]);
    }
    setEditTrainer(null); // Reset edit state
    setNewTrainer({ name: '', specialty: '' }); // Reset form
  };

  const handleEditTrainer = (trainer) => {
    setEditTrainer(trainer);
  };

  const handleDeleteTrainer = (id) => {
    setTrainers(trainers.filter(trainer => trainer.id !== id));
  };

  return (
    <div>
      <h2>Trainers</h2>
      <form onSubmit={handleAddOrUpdateTrainer}>
        <input
          type="text"
          placeholder="Name"
          value={editTrainer ? editTrainer.name : newTrainer.name}
          onChange={(e) => editTrainer ? setEditTrainer({ ...editTrainer, name: e.target.value }) : setNewTrainer({ ...newTrainer, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Specialty"
          value={editTrainer ? editTrainer.specialty : newTrainer.specialty}
          onChange={(e) => editTrainer ? setEditTrainer({ ...editTrainer, specialty: e.target.value }) : setNewTrainer({ ...newTrainer, specialty: e.target.value })}
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
