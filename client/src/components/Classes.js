import React, { useState, useEffect } from 'react';

function DogTrainingClass() {
  const [classes, setClasses] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [formData, setFormData] = useState({
    name: "",
    dog_id: "",
    trainer_id: "",
  });

  useEffect(() => {
    fetch('/classes')
      .then((r) => r.json())
      .then((fetchedClasses) => setClasses(fetchedClasses))
      .catch((error) => console.error('Error fetching classes:', error));
  }, []);

  const handleAddClass = (event) => {
    event.preventDefault();

    fetch('/classes', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    .then((r) => r.json())
    .then((newClass) => {
      // Assuming the response includes the newly added class
      setClasses([...classes, newClass]);
      setFormData({ name: "", dog_id: "", trainer_id: "" }); // Reset form data
    })
    .catch((error) => console.error('Error:', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDeleteClass = (index) => {
    const filteredClasses = classes.filter((_, i) => i !== index);
    setClasses(filteredClasses);
  };

  // This function seems to be intended for editing but lacks implementation details
  const handleEditClass = (index) => {
    // Implementation for editing logic will go here
    console.log('Edit functionality to be implemented');
  };

  return (
    <div>
      <h2>Dog Training Classes</h2>
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Class Name"
        />
        <input
          type="text"
          name="dog_id"
          value={formData.dog_id}
          onChange={handleChange}
          placeholder="Dog ID"
        />
        <input
          type="text"
          name="trainer_id"
          value={formData.trainer_id}
          onChange={handleChange}
          placeholder="Trainer ID"
        />
        <button onClick={handleAddClass}>
          {editIndex >= 0 ? 'Update Class' : 'Add Class'}
        </button>
      </div>
      <ul>
        {classes.map((classItem, index) => (
          <li key={index}>
            <strong>{classItem.name}</strong>: {classItem.dog_id} {classItem.trainer_id}
            <button onClick={() => handleEditClass(index)}>Edit</button>
            <button onClick={() => handleDeleteClass(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DogTrainingClass;
