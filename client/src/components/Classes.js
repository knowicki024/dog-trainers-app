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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddClass = (event) => {
    event.preventDefault();

    fetch('/classes', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    .then((r) => r.json())
    .then((newClass) => {
      setClasses([...classes, newClass]);
      setFormData({ name: "", dog_id: "", trainer_id: "" }); // Reset form data
    })
    .catch((error) => console.error('Error:', error));
  };

//   function handleEditClassSubmit() {

//     fetch(`/classes/${classes.id}`, {
//         method: "PATCH",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(formData),
//     })
//     .then((r) => r.json())
//     .then((updatedClass) => {
//       const updatedClasses = classes.map((item) => 
//         item.id === classes.id ? updatedClass : item
//       );
//       setClasses(updatedClasses);
//       setEditIndex(-1); 
//       setFormData({ name: "", dog_id: "", trainer_id: "" }); 
//     })
//     .catch((error) => console.error('Error:', error));
//   };

  const handleDeleteClass = (id) => {
    const url = `/classes/${id}`; 
    fetch(url, {
        method: "DELETE",
    })
    .then(() => {
      const filteredClasses = classes.filter((item) => item.id !== id);
      setClasses(filteredClasses);
    })
    .catch((error) => console.error('Error:', error));
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
            <button onClick={() => setEditIndex(index) && setFormData({ name: classItem.name, dog_id: classItem.dog_id, trainer_id: classItem.trainer_id })}>Edit</button>
            <button onClick={() => handleDeleteClass(classItem.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DogTrainingClass;
