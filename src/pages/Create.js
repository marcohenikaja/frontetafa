import axios from 'axios';
import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Table from 'react-bootstrap/Table';
import Navbare from './Navbare';


const Create = (props) => {

    <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
    />
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [date_de_naissance, setDateNaissance] = useState('');

    const [donnee, setDonnee] = useState([])

    useEffect(() => {
        afficher();
    }, [donnee]);

    const afficher = async () => {
        try {
            const response = await axios.get("https://backende-tafa.onrender.com/afficherTous");
            setDonnee(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const ajouter = (e) => {
        e.preventDefault()

        const data = { nom, prenom, date_de_naissance }

        if (data.nom == "" || data.prenom == "" || data.date_de_naissance == "") {

            toast.warn('Veuillez remplir les champs vides', {
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

        axios.post("http://localhost:8000/createOne", data)
            .then((response) => {
                toast.success('Utilisateur bien ajouté!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setNom("")
                setPrenom("")
                setDateNaissance("y")
                handleClose(true)
                setDonnee(donnee)
            }).catch((error) => {
                console.log(error);
            })

    }


    const supprimer = (id) => {

        try {
            const supprime = axios.delete(`https://backende-tafa.onrender.com/deleteone/${id}`).then((response) => {
                toast.error('Deleted', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
        } catch (error) {

        }
    }

    const modifier = (id) => {
        try {
            const manova = axios.put(`https://backende-tafa.onrender.com/updateOne/${id}`)
        } catch (error) {

        }
    }

    
    return (

        <div>
            <div style={{ marginTop: '100px' }}></div>
            <Navbare />

            <>
                <Button variant="primary" onClick={handleShow}>
                    Ouvrir le modal
                </Button>
                
              
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Entrer les informations</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="nom">
                                <Form.Label>Nom</Form.Label>
                                <Form.Control type="text" value={nom} onChange={e => setNom(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="prenom">
                                <Form.Label>Prénom</Form.Label>
                                <Form.Control type="text" value={prenom} onChange={e => setPrenom(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="dateNaissance">
                                <Form.Label>Date de naissance</Form.Label>
                                <Form.Control type="date" value={date_de_naissance} onChange={e => setDateNaissance(e.target.value)} />
                            </Form.Group>

                            <Button variant="secondary" onClick={handleClose}>
                                Fermer
                            </Button>
                            <Button variant="primary" onClick={ajouter} type="submit">
                                Enregistrer les changements
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>

                <Table id="tableau" striped>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Mot de passe</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donnee.map((user) => (
                            <tr key={user.id}>
                                <td>{user.login}</td>
                                <td>{user.password}</td>
                                <td> <Button variant="danger" onClick={() => supprimer(user.id)}>Supprimer</Button> <Button variant="primary">Update</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </>


            <ToastContainer />
        </div>
    );
}

export default Create;
