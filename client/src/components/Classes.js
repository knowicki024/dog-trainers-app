import React, { useState, useEffect } from 'react';

function DogTrainingClass() {
  const [classes, setClasses] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [newClass, setNewClass] = useState({ name: '', description: '' });

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('/classes');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const classArr = await response.json();
        setClasses(classArr);
      } catch (error) {
        console.error("Failed to fetch trainers:", error);
      }
    };
    fetchClasses();
  }, []);    


  const handleAddClass = () => {
    if (editIndex >= 0) {
      // Update existing class
      const updatedClasses = classes.map((item, index) =>
        index === editIndex ? newClass : item
      );
      setClasses(updatedClasses);
      setEditIndex(-1);
    } else {
      // Add new class
      setClasses([...classes, { ...newClass, id: Date.now() }]);
    }
    setNewClass({ name: '', description: '' }); // Reset form
  };

  const handleDeleteClass = (index) => {
    const filteredClasses = classes.filter((_, i) => i !== index);
    setClasses(filteredClasses);
  };

  const handleEditClass = (index) => {
    setNewClass(classes[index]);
    setEditIndex(index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClass({ ...newClass, [name]: value });
  };

  return (
    <div>
      <h2>Dog Training Classes</h2>
      <div>
        <input
          type="text"
          name="name"
          value={newClass.name}
          onChange={handleChange}
          placeholder="Class Name"
        />
        <input
          type="text"
          name="description"
          value={newClass.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <button onClick={handleAddClass}>
          {editIndex >= 0 ? 'Update Class' : 'Add Class'}
        </button>
      </div>
      <ul>
        {classes.map((classItem, index) => (
          <li key={index}>
            <strong>{classItem.name}</strong>: {classItem.description}
            <button onClick={() => handleEditClass(index)}>Edit</button>
            <button onClick={() => handleDeleteClass(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DogTrainingClass;
