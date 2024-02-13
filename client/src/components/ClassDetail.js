import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom"


const ClassDetail = () => {
    const [cls, setCls] = useState({})
    const {id} = useParams()

    useEffect(() =>{
        fetch(`/classes/${id}`)
            .then(r => {
                if (!r.ok){
                    throw new Error("Network response was not ok")
                }
                return r.json()
            })
            .then((data) => setCls(data))
            .catch((err) => console.error('Error fetching class details', err))

    }, [id])

    if(!cls || !cls.dog){
        return <p>Loading...</p>
    }

    return(
        <div className="class-detail-container">
        <h1>Class Details</h1>
        <li className="card">
          <div className="card-content">
            <h5 className="card-name">Class Name: {cls.name}</h5>
            <p className="card-classes">Participating Dog: {cls.dog.name}</p>
            <p className="card-classes">Trainer: {cls.trainer.name}</p>
            <p className="card-classes">Price: ${cls.trainer.price}</p>
            
            
          </div>
        </li>
      </div>
    )
}

export default ClassDetail