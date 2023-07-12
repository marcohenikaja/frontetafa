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
    const [comments, setComments] = useState([]);


    const [pub, setPub] = useState("");
    const [pubs, setPubs] = useState([]);
    const [commentjiaby, setCommentjiaby] = useState([]);
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
            const micommanty = await axios.put(`https://backende-tafa.onrender.com/manaocommantera/${id}`, {
                comment: comments[id],
                userId,
                username
            });

            if (micommanty.data.success === true) {
                setComments((prevComments) => ({
                    ...prevComments,
                    [id]: ''
                }));
            }
        } catch (error) {
            console.error(error);
        }
    };





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

    useEffect(() => {
        const makamentaire = async () => {
            try {
                const response = await axios.get('https://backende-tafa.onrender.com/makamentaire');
                setCommentjiaby(response.data)
                console.log(commentjiaby);
            } catch (error) {
                console.error(error);
            }
        };
        makamentaire();
    }, [comments]);




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
                {pubs.map((pub) => (
                    <Card key={pub._id} style={{ margin: '10px', width: '500px', height: '500px', overflow: 'auto' }}>
                        <Card.Header style={{ backgroundColor: 'black', color: 'white' }}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                Publication de : <div style={{ color: 'orange' }}>{getUserName(pub.sender_id)}</div>
                            </div>
                        </Card.Header>
                        <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Card.Text style={{ overflowWrap: 'break-word' }}>
                                {pub.text}
                            </Card.Text>
                            <div className="commenteoe" style={{ borderColor: 'pink', borderRadius: 'red', maxHeight: '200px', overflowY: 'auto' }}>
                                {commentjiaby.map((comment) => {
                                    if (comment.id_pub === pub._id) {
                                        return (
                                            <div key={comment._id}>
                                                <Button variant="info">{comment.anarana}</Button> - {comment.text}
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>

                            <textarea
                                value={comments[pub._id] || ''}
                                onChange={(e) =>
                                    setComments((prevComments) => ({
                                        ...prevComments,
                                        [pub._id]: e.target.value
                                    }))
                                }
                                placeholder="Écrire un commentaire..."
                                style={{ resize: 'none', marginTop: '10px' }}
                            ></textarea>

                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="primary" disabled={liked} onClick={mampiakatra}>
                                    Like {like}
                                </Button>
                             <Button onClick={() => commenteo(pub._id)} variant="success">
                                    Comment
                                </Button>

                            </div>

                        </Card.Body>
                    </Card>
                ))}
            </div>




        </div>
    );
};

export default Accueil;
