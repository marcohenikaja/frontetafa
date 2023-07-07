import React from 'react';
import Navbare from './Navbare';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import FormData from 'form-data';

const Accueil = () => {


    const userId = sessionStorage.getItem('userId');
    const username = sessionStorage.getItem('username');
    const [like, setLike] = useState(0);
    const [liked, setLiked] = useState(false);


    const [pub, setPub] = useState("");
    const [pubs, setPubs] = useState([]);
    const [comment, setComment] = useState("");
    const [users, setUsers] = useState([]);
    const [image, setImage] = useState("");

    const maka = async () => {
        try {
            const v = await axios.get('https://backende-tafa.onrender.com/getAllUser');
            setUsers(v.data)
        } catch (error) {

        }
    }
    const insertImage = async (e) => {
        setImage(e.target.files[0]);

    }
    const commenteo = async (id) => {

        try {
            const micommanty = await axios.put(`https://backende-tafa.onrender.com/manaocommantera/${id}`,
                { comment, userId }
            );
            setComment("")
        } catch (error) {

        }

    }

    const mampiakatra = () => {
        if (liked) {
            return;

        }
        setLike(like + 1);
        setLiked(true)
    }

    useEffect(() => {
        maka();
        afficherPub();
    }, [pub]);



    const afficherPub = async () => {
        try {
            const response = await axios.get('https://backende-tafa.onrender.com/makapub');

            setPubs(response.data);
            console.log(pubs);
            pubs.map((p) => {
                console.log(p.sender_id);
            }
            )
            console.log(pubs[0].sender_id);
        } catch (error) {
            console.error("Erreur lors de la récupération de la publication :", error);
        }
    };

    const getUserName = (id) => {
        const user = users.find(user => user._id === id);
        return user ? user.login : 'Unknown';
    };


    

    const publier = (e) => {
        e.preventDefault();
        try {
            axios.post('https://backende-tafa.onrender.com/publication', {
                pub: pub,
                sender_id: userId,
               // image: image
            }).then((response) => {
                setPub("")
                if (response.data.success) {
                    toast.success('Bien publiée', {
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

            }).catch(() => {

            })
        } catch (error) {

        }

    }
    
    return (
        <div style={{ background: 'white' }}>
            <div style={{ marginTop: '100px' }}></div>
            <Navbare />
            <div style={{ position: 'fixed', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '20vh' }}>
                <h2>Créer une publication</h2>
                <form>
                    <textarea value={pub} onChange={(e) => setPub(e.target.value)} rows="4" cols="50" placeholder="Exprimez-vous..."></textarea>

                    <br />
                    <input type="file" accept="image/*" onChange={insertImage} />
                    <br />
                    <br />
                    <button style={{ padding: '8px 16px', border: 'none', borderRadius: '4px', backgroundColor: '#4CAF50', color: 'white', fontSize: '16px' }} onClick={publier}>Publier</button>
                    {image == "" || image == null ? "" : <img width={100} height={100} src={image} />}
                </form>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
                {pubs.map((pubs) => (

                    <Card key={pubs._id} style={{ margin: '10px' }}>
                        <Card.Header style={{ backgroundColor: 'black', color: 'white' }}>Publication de : {getUserName(pubs.sender_id)}</Card.Header>
                        <Card.Body>

                            <Card.Text>
                                {pubs.text} <input type="hidden" value={pubs._id} /><br />
                                <Form.Control as="textarea" rows={4} value={comment} onChange={(e) => setComment(e.target.value)} />
                            </Card.Text>
                            <div className="commenteoe" style={{ borderColor: 'pink', borderRadius: 'red' }}>

                            </div>

                            <Button variant="primary" disabled={liked} onClick={mampiakatra}>LIke {like}</Button><Button onClick={() => commenteo(pubs._id)} variant="success">Comment </Button>
                        </Card.Body>
                    </Card>
                ))}

            </div>



        </div>
    );
};

export default Accueil;
