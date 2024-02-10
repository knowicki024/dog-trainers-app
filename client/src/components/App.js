import React, {useState, useEffect} from 'react';
import Home from './Home';
import Header from './Header';
import Login from './Login'

function App() {
    const [user, setUser] = useState(null);



const onLogin = (user) => {
    setUser(user);
}


    return (
        <>
            <Header />
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
            <Home/>
        </>
    );
};

export default App;
