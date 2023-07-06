import React, { useState } from 'react';
import { Navbar, Nav, Container, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Deconnexion from './Deconnexion';



const userId = sessionStorage.getItem('userId');
const username = sessionStorage.getItem('username');

const NavbareAdmin = () => {
  const [sessionData, setSessionData] = useState(null);

  const handleClick = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("username");
    sessionStorage.clear();
  
    const userId = sessionStorage.getItem("userId");
    const username = sessionStorage.getItem("username");
  
    if (userId === null && username === null) {
      toast.success("Vous êtes déconnecté", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      window.location.href = "./Login";
    } else {
      toast.error("Problème de déconnexion", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  

  useEffect(() => {

    const isAuthenticated = sessionStorage.getItem("userId") !== null;

    if (!isAuthenticated) {
      window.location.href = './Login';
    }
  }, []);


  return (
    <div>

      <Navbar bg="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="#" style={{ color: 'blue', fontSize: '40px', marginRight: '600px' }}>
            E-Tafa  {username}
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink
                to="/accueil"
                style={{ color: 'black', fontSize: '20px', textDecoration: 'none', borderBottom: 'none', marginRight: '35px' }}
              >
                Accueil
              </NavLink>


              <NavLink
                to="/create"
                style={{ color: 'black', fontSize: '20px', textDecoration: 'none', borderBottom: 'none', marginRight: '35px' }}
              >
                Ban
              </NavLink>

              <NavLink
                to="/message"
                style={{ color: 'black', fontSize: '20px', textDecoration: 'none', borderBottom: 'none', marginRight: '35px' }}
              >
                Message
              </NavLink>
              <NavLink
                to="/contact"
                style={{ color: 'black', fontSize: '20px', textDecoration: 'none', borderBottom: 'none', marginRight: '35px' }}
              >
                Contact
              </NavLink>
              <NavLink
                to="/about"
                style={{ color: 'black', fontSize: '20px', textDecoration: 'none', borderBottom: 'none', marginRight: '35px' }}
              >
                A propos
              </NavLink>

              <button onClick={handleClick}>Déconnexion</button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


      <ToastContainer />
    </div>
  );
};

export default NavbareAdmin;
