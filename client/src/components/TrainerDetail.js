import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';

const TrainerDetail = () => {
  const [trainer, setTrainer] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`/trainers/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setTrainer(data))
      .catch((error) => console.error("Error fetching trainer details:", error));
  }, [id]);

  if (!trainer) {
    return <Container className="text-center mt-5"><p>Loading...</p></Container>;
  }

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header as="h1">Trainer Details</Card.Header>
        <Card.Body>
          <Card.Title>Name: {trainer.name}</Card.Title>
          <Card.Text>
            Price: ${trainer.price}
          </Card.Text>
          {trainer.classes && trainer.classes.length > 0 ? (
            <>
              <Card.Text>
                Total Classes held: {trainer.classes.length}
              </Card.Text>
              <ListGroup variant="flush">
                {trainer.classes.map((classItem) => (
                  <ListGroup.Item key={classItem.id}>Class Name: {classItem.name}</ListGroup.Item>
                ))}
              </ListGroup>
            </>
          ) : (
            <Card.Text>No classes available</Card.Text>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TrainerDetail;
