import React , {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';


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
            console.log(response);

            if (response.ok) {
                // Successful response (status code in the range 200-299)
                return response.json();
            } else if (response.status === 401 || response.status === 500) {
                throw new Error('Invalid username or password')
            }            
        })
        .then((user) => {
            onLogin(user)
        })
        .catch((error) => {    
            // Show a pop-up alert for the invalid username error
            if (error.message === 'Invalid username or password') {
                window.alert('Invalid username or password. Please try again.')
                setUsername('') 
            }
        })}
    
    return (
        <Container>
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
      
      )}

export default Login
