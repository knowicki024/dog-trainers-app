import React from 'react'
import { useParams } from "react-router-dom"
import {useState, useEffect} from "react"

const TrainerDetail = () => {
    const [trainer, setTrainer] = useState({})
    const {id} = useParams()


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
      }, [id])

      if (!trainer) {
        return <p>Loading...</p>
      }
      
  return (
    <div className="Trainer-detail-container">
        <h1>Trainer Details</h1>
        <li className="card">
          <div className="card-content">
            <h4 className="card-name">Name: {trainer.name}</h4>
            <p className="card-price">trainer: ${trainer.price}</p>
            {trainer.classes && trainer.classes.length > 0 ? (
          <div>
              <h5 className="card-name">Total Classes held: {trainer.classes.length}</h5>
              {trainer.classes.map((classItem) => (
                <li key={classItem.id}>
                  <p>Class Name: {classItem.name}</p>
                </li>
              ))}
            </div>
          ) : (
            <p>No classes available</p>
          )}
          </div>
        </li>
      </div>
    
  )
}

export default TrainerDetail