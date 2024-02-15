import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';

function DogDetail({ user }) {
  const [dog, setDog] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`/dogs/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setDog(data))
      .catch((error) => console.error("Error fetching dog details:", error));
  }, [id]);

  if (!dog || !dog.classes) {
    return <Container className="text-center mt-5"><p>Loading...</p></Container>;
  }

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header>
          <h1>Dog Details</h1>
        </Card.Header>
        <Card.Body>
          <Card.Title>{dog.name}</Card.Title>
          <Card.Text>
            Breed: {dog.breed}
          </Card.Text>
          <Card.Text>
            Owner: {dog.owner}
          </Card.Text>
          <h5>Classes</h5>
          <ListGroup>
            {dog.classes.map((classItem) => (
              <ListGroup.Item key={classItem.id}>
                <strong>Class Name:</strong> {classItem.name}<br />
                <strong>Trainer:</strong> {classItem.trainer.name}<br />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default DogDetail;
