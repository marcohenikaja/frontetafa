import React, { useState } from 'react';
import { Navbar, Nav, Container, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Deconnexion from './Deconnexion';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';



const userId = sessionStorage.getItem('userId');
const username = sessionStorage.getItem('username');
const navigate= useNavigate();
const Navbare = () => {
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {

    const isAuthenticated = sessionStorage.getItem("userId") !== null;

    if (!isAuthenticated) {
    navigate('/login');
    }
  }, []);


  const handleClick = async () => {
    const username = sessionStorage.getItem('username');

    if (username) {
      try {
        await sessionStorage.removeItem('userId');
        await sessionStorage.removeItem('username');
        await sessionStorage.clear();

        setTimeout(() => {
          const clearedUsername = sessionStorage.getItem('username');
          if (!clearedUsername) {
            toast.success("Vous êtes déconnecté ", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
             navigate('/login');
          } else {
            toast.error("Problème de déconnexion ppp", {
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
        }, 100);
      } catch (error) {
        console.log(error);
        toast.error("Erreur lors de la déconnexion", {
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
    }
  };






  return (
    <div>

      <Navbar bg="black" expand="lg" fixed="top"style= {{borderRadius:'10px'}}>
        <Container>
          <Navbar.Brand href="#" style={{ color: 'orange', fontSize: '40px', marginRight: '600px'  }}>
            E-Tafa <span style={{ color: 'red' }}>{username}</span>
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink
                to="/accueil"
                style={{ color: 'white', fontSize: '20px', textDecoration: 'none', borderBottom: 'none', marginRight: '35px' }}
              >
                Accueil
              </NavLink>
              <NavLink
                to="/message"
                style={{ color: 'white', fontSize: '20px', textDecoration: 'none', borderBottom: 'none', marginRight: '35px' }}
              >
                Message
              </NavLink>
              <NavLink
                to="/contact"
                style={{ color: 'white', fontSize: '20px', textDecoration: 'none', borderBottom: 'none', marginRight: '35px' }}
              >
                Contact
              </NavLink>
              {/* <NavLink
                to="/about"
                style={{ color: 'white', fontSize: '20px', textDecoration: 'none', borderBottom: 'none', marginRight: '35px' }}
              >
                A propos
              </NavLink> */}

              <button onClick={handleClick} style={{ padding: '8px 16px', border: 'none', borderRadius: '4px', backgroundColor: '#f44336', color: 'white', fontSize: '16px', cursor: 'pointer', }}  > Déconnexion
              </button>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


      <ToastContainer />
    </div>
  );
};

export default Navbare;
