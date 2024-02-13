import { useParams } from "react-router-dom"
import {useState, useEffect} from "react"

function DogDetail (){
    const [dog, setDog] = useState({})
    const {id} = useParams()
    
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
      }, [id])

    if (!dog || !dog.classes) {
        return <p>Loading...</p>
      }

    return(
        <div className="dog-detail-container">
        <h1>Dog Details</h1>
        <li className="card">
  
          <div className="card-content">
            <h4 className="card-name">Name: {dog.name}</h4>
            <p className="card-classes">Breed: {dog.breed}</p>
            <p className="card-classes">Owner: {dog.owner}</p>
            {dog.classes.map((classItem) => (
          <li key={classItem.id}>
            <p>Class Name: {classItem.name}</p>
            <p>Trainer: {classItem.trainer.name}</p>
            <p>Price: ${classItem.trainer.price}</p>
          </li>
        ))}
          </div>
        </li>
      </div>
    )
}
export default DogDetail