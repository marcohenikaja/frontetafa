import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./Login";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';


function Inscrit() {
    const [nom, setNom] = useState("")
    const [pass, setPass] = useState("")
    const [passcon, setPasscon] = useState("")
    const navigate = useNavigate();


    const miova = (e) => {
        setNom(e.target.value)
    }

    const inscription = async () => {
        if (pass != passcon) {
            toast.error('Vérifier votre mot de passe', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (nom == "" || passcon == "" || pass == "") {
            toast.error('Veuillez remplir les champs vide  ', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        } else {
            const data = { nom, pass }
          
            try {
                await axios.post('https://backende-tafa.onrender.com/inscrit', data).then((response) => {
    
                       navigate('../login');

                }).catch((error) => {
                    console.log(error);
                })
            } catch (error) {
                console.log(error);
            }

        }
    }

    return (
        <div>
            <Container fluid className="bg-light min-vh-100 d-flex flex-column">
                <Row className="flex-grow-1">
                    <Col md={{ span: 4, offset: 4 }} className="my-auto">
                        <div className="bg-white border rounded p-5">
                            <h1 style={{ color: 'maroon' }}>
                                E-Tafa
                            </h1>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Nom d'utilisateur"
                                        value={nom} onChange={miova}
                                    />

                                </Form.Group>
                                <br />
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control
                                        required
                                        type="password"
                                        placeholder="Mot de passe"
                                        value={pass} onChange={(e) => {
                                            setPass(e.target.value);
                                        }}
                                    />

                                </Form.Group> <br />
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control
                                        required
                                        type="password"
                                        placeholder="Comfirmation de mot de passe"
                                        value={passcon} onChange={(e) => {
                                            setPasscon(e.target.value);
                                        }}
                                    />

                                </Form.Group>
                                <br />
                                <Button onClick={inscription} variant="primary" className="w-100 mt-3">
                                    S'inscrire
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
                        Déjà inscrit ? <NavLink
                            to="/login"
                            style={{ color: 'black', fontSize: '20px', textDecoration: 'none', borderBottom: 'none', marginRight: '35px' }}
                        >Connectez-vous</NavLink>
                    </Col>
                </Row>
            </Container>

            <ToastContainer />

        </div>
    );
}

export default Inscrit;
