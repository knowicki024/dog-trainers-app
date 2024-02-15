import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';


function Logout({onLogOut}){

    function handleLogout() {
        fetch("/logout", {
          method: "DELETE",
        }).then(() => onLogOut());
      }
    
      return (
        <Container>
          <Button onClick={handleLogout}>Logout</Button>
        </Container>
      )}



export default Logout