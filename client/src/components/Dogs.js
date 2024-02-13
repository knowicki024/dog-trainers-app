import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Dogs({ user }) {
  const [dogs, setDogs] = useState([]);
  const [editDog, setEditDog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    owner: "",
    breed: "",
  });

  useEffect(() => {
    fetch('/dogs')
      .then((r) => r.json())
      .then((fetchedDogs) => setDogs(fetchedDogs))
      .catch((error) => console.error('Error fetching dogs:', error));
  }, []);

  const handleAddDog = (event) => {
    event.preventDefault();
    fetch('/dogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((newDog) => {
        setDogs([...dogs, newDog]);
        setFormData({ name: "", owner: "", breed: "" }); // Reset form
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDeleteDog = (id) => {
    fetch(`/dogs/${id}`, {
      method: 'DELETE',
    })
      .then((r) => {
        if (r.ok) {
          setDogs(dogs.filter((dog) => dog.id !== id));
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  const filteredDogs = dogs.filter(dog =>
    dog.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ListGroup>
        {filteredDogs.map((dog) => (
          <ListGroup.Item key={dog.id} className="d-flex justify-content-between align-items-center">
            <Link to={user ? `/dogs/${dog.id}` : '/'}
                  onClick={() => {
                  if (!user) {
                          alert('Please log in to view dog details.');
                          }}}
            >
            {dog.name} ({dog.breed})
            </Link>
            <div>
              <Button onClick={() => setEditDog(dog)} variant="outline-secondary" size="sm">Edit</Button>{' '}
              <Button onClick={() => handleDeleteDog(dog.id)} variant="outline-danger" size="sm">Delete</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Row className="mt-4">
        <Col>
          <h4>{editDog ? 'Edit Dog' : 'Add a New Dog'}</h4>
          <Form onSubmit={handleAddDog}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Dog's name" name="name" value={formData.name} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Breed</Form.Label>
              <Form.Control type="text" placeholder="Dog's breed" name="breed" value={formData.breed} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Owner</Form.Label>
              <Form.Control type="text" placeholder="Owner's name" name="owner" value={formData.owner} onChange={handleInputChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              {editDog ? 'Update Dog' : 'Add Dog'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Dogs;
