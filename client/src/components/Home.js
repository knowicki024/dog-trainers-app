import React , {useState, useEffect} from 'react';
import Classes from './Classes';
import Trainers from './Trainers';
import Dogs from './Dogs';
import Login from './Login'

function Home() {
    const [user, setUser] = useState(null)

    const onLogin = (user) => {
    setUser(user);
    }

    useEffect(() =>{
        fetch('/check_session')
            .then(r => r.json())
            .then(user => setUser(user))
    }, [])


    return(
    <>
        <Classes/>
        <Trainers/>
        <Dogs/>
        {user ? (
                <p>Welcome {user.name}!</p>) 
                : 
                (
                <div>
                <p>Please login</p>
                <Login onLogin={onLogin} />
                </div>
                )
            }
    </>
    )}

export default Home


