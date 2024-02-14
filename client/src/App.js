import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Classes from './components/Classes';
import Trainers from './components/Trainers';
import Dogs from './components/Dogs';
import DogDetail from './components/DogDetail';
import ClassDetail from './components/ClassDetail';
import TrainerDetail from './components/TrainerDetail';

function App() {
  const [user, setUser] = useState(null);
  const [classes, setClasses] = useState([]);
  const [dogs, setDogs] = useState([]); 
  const [trainers, setTrainers] = useState([]);

  const onLogin = (user) => {
    setUser(user);
  };

  const onLogOut = () => {
    setUser(null);
  };

  useEffect(() => {
    fetch('/check_session')
      .then((r) => {
        if (!r.ok) {
          throw new Error('Session check failed');
        }
        return r.json();
      })
      .then((user) => setUser(user))
      .catch(() => setUser(null));
  }, []);

  function updateClasses(updatedClass) {
    const updatedClasses = classes.map((cls) => 
      cls.id === updatedClass.id ? updatedClass : cls
    );
    setClasses(updatedClasses);
  }

  function updateDogs(updatedDog) { 
    const updatedDogsList = dogs.map((dog) => 
      dog.id === updatedDog.id ? updatedDog : dog
    );
    setDogs(updatedDogsList); 
  }

  function updateTrainers(updatedTrainer) {
    const updatedTrainersList = trainers.map((trainer) => 
        trainer.id === updatedTrainer.id ? updatedTrainer : trainer
    );
    setTrainers(updatedTrainersList);
  }
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home user={user} onLogin={onLogin} onLogOut={onLogOut} />} />
        <Route path="/classes" element={<Classes classes={classes} onUpdateClass={updateClasses} user={user} />} />
        <Route path="/dogs" element={<Dogs user={user} onUpdateDog={updateDogs} />} /> {/* Corrected prop name to onUpdateDog */}
        <Route path="/trainers" element={<Trainers onUpdateTrainer={updateTrainers} user={user}/>} />
        <Route path="/dogs/:id" element={<DogDetail user={user} />} />
        <Route path="/classes/:id" element={<ClassDetail onUpdateClass={updateClasses} />} />
        <Route path="/trainers/:id" element={<TrainerDetail />} />
      </Routes>
    </>
  );
}

export default App;
