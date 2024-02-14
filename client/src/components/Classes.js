import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function DogTrainingClass({ onUpdateClass, user }) {
  const [classes, setClasses] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Changed from -1 to null for clarity
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddClass = () => {
    const method = editIndex === null ? "POST" : "PATCH";
    const url = editIndex === null ? '/classes' : `/classes/${editIndex}`;

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    .then((r) => r.json())
    .then((newOrUpdatedClass) => {
      if (editIndex === null) {
        setClasses([...classes, newOrUpdatedClass]);
      } else {
        const updatedClasses = classes.map((item) => item.id === editIndex ? newOrUpdatedClass : item);
        setClasses(updatedClasses);
        if (onUpdateClass) onUpdateClass(newOrUpdatedClass); // Call onUpdateClass if provided
      }
      setFormData({ name: "", dog_id: "", trainer_id: "" }); // Reset form data
      setEditIndex(null); 
    })
    .catch((error) => console.error('Error:', error));
  };

  const handleDeleteClass = (id) => {
    fetch(`/classes/${id}`, {
        method: "DELETE",
    })
    .then(() => {
      const filteredClasses = classes.filter((item) => item.id !== id);
      setClasses(filteredClasses);
    })
    .catch((error) => console.error('Error:', error));
  };

  const startEditClass = (classItem) => {
    setFormData({
      name: classItem.name,
      dog_id: classItem.dog_id,
      trainer_id: classItem.trainer_id,
    });
    setEditIndex(classItem.id);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddClass(); 
  };

  return (
    <div>
      <h2>Dog Training Classes</h2>
      <form onSubmit={handleSubmit}> 
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
        <button type="submit">
          {editIndex !== null ? 'Update Class' : 'Add Class'}
        </button>
      </form>
      <ul>
        {classes.map((classItem, index) => (
          <Link to={user ? `/classes/${classItem.id}` : '/'}
              onClick={() => {
                if (!user) {
                        alert('Please log in to view classes details.');
                        }}}
          >
            <li key={index}>
              <strong>{classItem.name}</strong>: {classItem.dog_id} {classItem.trainer_id}
              <button onClick={() => startEditClass(classItem)}>Edit</button>
              <button onClick={() => handleDeleteClass(classItem.id)}>Delete</button>
            </li>
            </Link>
        ))}
      </ul>
    </div>
  );
}

export default DogTrainingClass;
