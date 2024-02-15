import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';

const ClassDetail = () => {
  const [cls, setCls] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`/classes/${id}`)
      .then(r => {
        if (!r.ok) {
          throw new Error("Network response was not ok");
        }
        return r.json();
      })
      .then((data) => setCls(data))
      .catch((err) => console.error('Error fetching class details', err));
  }, [id]);

  if (!cls || !cls.dog) {
    return <Container className="text-center mt-5"><p>Loading...</p></Container>;
  }

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header as="h1">Class Details</Card.Header>
        <Card.Body>
          <Card.Title>{cls.name}</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>Participating Dog: {cls.dog.name}</ListGroup.Item>
            <ListGroup.Item>Trainer: {cls.trainer.name}</ListGroup.Item>
            <ListGroup.Item>Price: ${cls.trainer.price}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ClassDetail;
