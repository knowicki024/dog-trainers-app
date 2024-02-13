import React, {useState, useEffect} from 'react';
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
    const [user, setUser] = useState(null)

    const onLogin = (user) => {
        setUser(user)
        }
    
        const onLogOut = () => {
            setUser(null)
        }
    
        useEffect(() =>{
            fetch('/check_session')
                .then(r => {
                    if (!r.ok){
                        if (r.response === 401)
                        {setUser(null)
                    }
                }else{
                    return r.json()
                }})
                .then(user => setUser(user))
        }, [])
    

    useEffect(() =>{
        fetch('/check_session')
            .then(r => {
                if (!r.ok){
                    if (r.response === 401)
                    {setUser(null)
                }
            }else{
                return r.json()
            }})
            .then(user => setUser(user))
    }, [])
 
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home user={user} onLogin={onLogin} onLogOut={onLogOut}/>} />
                <Route path="/classes" element={<Classes />} />
                <Route path="/dogs" element={<Dogs user={user} />} />
                <Route path="/trainers" element={<Trainers />} />
                <Route path="/dogs/:id" element={<DogDetail user={user} />} />
                <Route path="/classes/:id" element={<ClassDetail />} />
                <Route path="/trainers/:id" element={<TrainerDetail />} />
            </Routes>
        </>
    )
}

export default App;
