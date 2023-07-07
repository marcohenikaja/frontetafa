import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaInstagram } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import Create from "./Create";
import Message from "./Message";
import 'react-toastify/dist/ReactToastify.css';
import Navbare from "./Navbare";
import Accueil from "./Accueil";
import axios from "axios";
import { NavLink } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loggedIn, setLoggedIn] = useState(false);
    const [anarana, setAnarana] = useState(null);

    const connexion = async (req, res) => {
        const data = { username, password };
        if (data.username == "" || data.password == "") {
            toast.error('Veuillez remplir les champs vides', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        else {

            try {
                await axios.post('https://backende-tafa.onrender.com/login', data)
                    .then((response) => {
                        console.log(response.data);
                        if (response.data.success) {
                            toast.success('Vous etes connecte', {
                                position: "top-center",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            });
                            const userId = response.data.userId;
                            const nom = response.data.username;
                            console.log(nom);
                            sessionStorage.setItem('userId', userId);
                            sessionStorage.setItem('username', nom);
                            window.location.href = '/accueil';
                           // window.location.href = './Navbare';
                            


                        } else {
                            toast.error('Mot de passe ou Login invalide', {
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
                    }).catch((err) => {
                        console.log(err);
                    })
            } catch (error) {
                toast.error('Nom d\'utilisateur ou mot de passe incorrect', {
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
            <Container fluid className="bg-light min-vh-100 d-flex flex-column">
                <Row className="flex-grow-1">
                    <Col md={{ span: 4, offset: 4 }} className="my-auto">
                        <div className="bg-white border rounded p-5">
                            <div className="d-flex align-items-center">

                                <h1 className="ml-2" style={{ color: 'maroon' }}>
                                    E-Tafa
                                </h1>
                            </div>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Nom d'utilisateur"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)} />

                                </Form.Group>
                                <br />
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control
                                        required
                                        type="password"
                                        placeholder="Mot de passe"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}

                                    />

                                </Form.Group>
                                <br />
                                <Button onClick={connexion} variant="primary" className="w-100 mt-3">
                                    Se connecter
                                </Button>
                            </Form>
                        </div>
                        <div className="mt-3 text-center">
                            <a href="/">Mot de passe oublié ?</a>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center mt-3">
                        Vous n'avez pas de compte ? <NavLink
                            to="/inscription"
                            style={{ color: 'black', fontSize: '20px', textDecoration: 'none', borderBottom: 'none', marginRight: '35px' }}
                        >Inscrivez-vous</NavLink>
                    </Col>
                </Row>
            </Container>

            <ToastContainer />

        </div>
    );
}

export default Login;
