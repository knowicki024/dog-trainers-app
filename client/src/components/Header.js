// import { Link } from "react-router-dom"
import {Navbar, Container, Nav} from 'react-bootstrap'
function Header()
{
    return (
        <>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/">Dog Trainer Company</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/dogs">Dogs</Nav.Link>
              <Nav.Link href="/classes">Classes</Nav.Link>
              <Nav.Link href="/trainers">Trainers</Nav.Link>

            </Nav>
          </Container>
        </Navbar>
        </>
    )
}

export default Header