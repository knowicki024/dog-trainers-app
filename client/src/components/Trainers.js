import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Trainers({ updateTrainers, user }) {
  const [trainers, setTrainers] = useState([])
  const [editTrainer, setEditTrainer] = useState(null)
  const [formData, setFormData] = useState({ name: "", price: "",  password:''})
  const [priceAsc, setPriceAsc] = useState(true)
  
  useEffect(() => {
    fetch('/trainers')
      .then((response) => response.json())
      .then((fetchedTrainers) => setTrainers(fetchedTrainers))
      .catch((error) => console.error('Error fetching trainers:', error))
  }, []);

  const handleAddOrUpdateTrainer = (event) => {
    event.preventDefault()
    if (formData.price < 50) {
      alert('Price must be at least 50.');
      setFormData({ name: '', price: "", password: '' })
      return
    }
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
      setFormData({ name: '', price: "", password: ""});
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

  const filteredTrainers = priceAsc ? sortedTrainersByAsc : sortedTrainersByDsc


  return (
    <Container>
      <Row className="mt-4">
        <Col xs={12} md={8}>
          <h2>Trainers</h2>
          <Button onClick={handleClick} className="mb-3">
            {priceAsc ? 'Filter Price High to Low' : 'Filter Price Low to High'}
          </Button>
          <ListGroup>
            {filteredTrainers.map((trainer) => (
              <ListGroup.Item key={trainer.id} className="d-flex justify-content-between align-items-center">
                <Link
                  to={user ? `/trainers/${trainer.id}` : '/'}
                  onClick={() => {
                    if (!user) {
                      alert('Please log in to view trainer details.');
                    }
                  }}
                >
                  {trainer.name} - ${trainer.price} - ID: {trainer.id}
                </Link>
                <div>
                  <Button variant="outline-secondary" size="sm" onClick={() => handleEditTrainer(trainer)}>
                    Edit
                  </Button>{' '}
                  <Button variant="outline-danger" size="sm" onClick={() => handleDeleteTrainer(trainer.id)}>
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col xs={12} md={4}>
          <h4>{editTrainer ? 'Edit Trainer' : 'Add a New Trainer'}</h4>
          <Form onSubmit={handleAddOrUpdateTrainer}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Trainer's name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="New password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {editTrainer ? 'Update Trainer' : 'Add Trainer'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Trainers;
