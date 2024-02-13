import React from 'react';
import Home from './components/Home';
import Header from './components/Header';
import Classes from './components/Classes';
import Trainers from './components/Trainers';
import Dogs from './components/Dogs';
import DogDetail from './components/DogDetail'
import ClassDetail from './components/ClassDetail'
import TrainerDetail from './components/TrainerDetail';
import { Route, Routes } from 'react-router-dom';


function App() {
 
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/classes" element={<Classes />} />
                <Route path="/dogs" element={<Dogs />} />
                <Route path="/trainers" element={<Trainers />} />
                <Route path="/dogs/:id" element={<DogDetail />} />
                <Route path="/classes/:id" element={<ClassDetail />} />
                <Route path="/trainers/:id" element={<TrainerDetail />} />
            </Routes>
        </>
    )
}

export default App;
