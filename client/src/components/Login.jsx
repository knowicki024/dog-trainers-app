import React , {useState} from 'react';

function Login({onLogin}){
    const [username, setUsername]= useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        
        fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username }),
        })
        .then((response) => {
            if (response.ok) {
                // Successful response (status code in the range 200-299)
                return response.json();
            } else if (response.status === 401) {
                throw new Error('Invalid username')
            }            
        })
        .then((user) => {
            onLogin(user)
        })
        .catch((error) => {    
            // Show a pop-up alert for the invalid username error
            if (error.message === 'Invalid username') {
                window.alert('Invalid username. Please try again.')
            }
        })}
    
    return (
        <form onSubmit={handleSubmit} >
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      )}

export default Login
