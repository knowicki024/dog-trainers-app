import React , {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Login({onLogin}){
    const [username, setUsername]= useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('form ')
        
        fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
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
                setUsername('') 
            }
        })}
        console.log(password)
    
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" value={username}
                    onChange={e => setUsername(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" value={password}
                onChange={e => setPassword(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
            Submit
            </Button>

        </Form>
      
        //     type="text"
        //     value={username}
        //     onChange={e => setUsername(e.target.value)}
        //   />
        //   <button type="submit">Login</button>
        // </form>
      )}

export default Login
