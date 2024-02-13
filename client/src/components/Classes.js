import React, { useState, useEffect } from 'react';

function DogTrainingClass() {
  const [classes, setClasses] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [newClass, setNewClass] = useState({ name: '', description: '' });

  useEffect(() => {
    fetch('/classes')
    .then((r) => r.json())
    .then((fetchedClasses) => setClasses(fetchedClasses))
    .catch((error) => console.error('Error fetching classes:', error));
  }, []);


  const handleAddClass = () => {
    const requestOptions = {
      method: editIndex >= 0 ? 'PATCH' : 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newClass),
    };
  
    const url = editIndex >= 0 ? `/classes/${classes.id}` : '/classes';
  
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((savedClass) => {
        if (editIndex >= 0) {
          const updatedClasses = classes.map((item, index) =>
            index === editIndex ? savedClass : item
          );
          setClasses(updatedClasses);
        } else {
          setClasses([...classes, savedClass]);
        }
        setEditIndex(-1); 
        setNewClass({ name: '', description: '' }); 
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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
