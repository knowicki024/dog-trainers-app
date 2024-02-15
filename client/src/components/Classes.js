import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function DogTrainingClass({ onUpdateClass, user }) {
  const [classes, setClasses] = useState([]);
  const [editIndex, setEditIndex] = useState(null); 
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
    <Container>
      <Row className="mt-4">
        <Col>
          <h2>Dog Training Classes</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Class Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter class name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Dog ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter dog ID"
                name="dog_id"
                value={formData.dog_id}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Trainer ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter trainer ID"
                name="trainer_id"
                value={formData.trainer_id}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {editIndex !== null ? 'Update Class' : 'Add Class'}
            </Button>
          </Form>
        </Col>
      </Row>
      <ListGroup className="mt-4">
        {classes.map((classItem, index) => (
          <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
            <Link to={user ? `/classes/${classItem.id}` : '/'}
                  onClick={(e) => {
                    if (!user) {
                      e.preventDefault();
                      alert('Please log in to view class details.');
                    }
                  }}>
              <strong>{classItem.name}</strong> - Dog ID: {classItem.dog_id}, Trainer ID: {classItem.trainer_id}
            </Link>
            <div>
              <Button variant="outline-secondary" size="sm" onClick={() => startEditClass(classItem)}>Edit</Button>{' '}
              <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClass(classItem.id)}>Delete</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}


export default DogTrainingClass;
