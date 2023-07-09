import React, { useEffect, useState } from 'react';
import Navbare from './Navbare';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const userId = sessionStorage.getItem('userId');
const username = sessionStorage.getItem('username');

const Message = () => {

  const [message, setMessage] = useState('');
  const [mess, setMess] = useState([]);
  const [user, setUser] = useState(null);
  const [list, setList] = useState([]);
  const [temp, setTemp] = useState('');
  const [anarana, setAnarana] = useState('')
  const [lastMess, setLastMess] = useState('')


  const handleChange = (e) => {
    setMessage(e.target.value);
  };




  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://backende-tafa.onrender.com/toususers/${userId}`);
        
        setList(response.data);
        console.log(list);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [mess]);

const afficher = (id, ana) => {
    const userId = sessionStorage.getItem('userId');
    const username = sessionStorage.getItem('username');
    setAnarana(ana);
    setTemp(id);
    setUser(id);
  };




    useEffect(() => {
    const fetchMessages = async (id) => {
      try {
        const response = await axios.get(`https://backende-tafa.onrender.com/${id}/${userId}`);
        setMess(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages(mess); // Appeler fetchMessages lorsque la valeur de "temp" change

  }, [temp]);

  
  // const fetchMessages = async (id) => {
  //   try {
  //     const response = await axios.get(`https://backende-tafa.onrender.com/makamessage/${id}/${userId}`);
  //     setMess(response.data);
  //     console.log(mess)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };



  const sendMessage = async (e) => {
    e.preventDefault();
    const userId = sessionStorage.getItem('userId');
    setTemp(e.target.value);
    if (temp === '') {
      toast.error('Veuillez sélectionner un destinataire', {
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

    try {
      const response = await axios.post('https://backende-tafa.onrender.com/message', {
        sender_id: userId,
        recipient_id: temp,
        content: message,
      });
      if (response.data.success) {

        const response = await axios.get(`https://backende-tafa.onrender.com/messagemaj/${temp}/${userId}`);
        const tableau = response.data;
        const f = tableau.length - 1;
        setTemp(tableau[f]['recipient_id']);
        setMess(response.data);
        setMessage('');
      }
      console.log('Le message a été envoyé:', message);
    } catch (error) {
      console.error(error);
    }
  };



  return (

    <div className="container-fluid">
      <div className="row">
        <div className="col-8 mx-auto my-auto text-center" >
          <div style={{ marginTop: '100px' }}></div>
          <Navbare />
          <div className="vatana">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#fff' }}>
              <div style={{ borderRadius: '100px' }}>
                <div style={{ position: 'fixed', top: '100px', left: '50%', transform: 'translateX(-50%)' }}>
                  <input value={anarana} type="hidden" />
                  <p style={{ background: 'lightgray', color: 'black', padding: '10px', borderRadius: '8px', maxWidth: '300px', margin: '10px auto', textAlign: 'center', marginLeft: '-380px' }}>
                    Envoyé à :  {anarana}
                  </p>

                </div>

                {mess.map((m) => (
                  <div key={m.id}>

                    {m.sender_id !== userId ? (
                      <div>
                        <p style={{ background: 'pink', color: 'white', height: '50px', width: '400px', borderRadius: '80px', textAlign: 'center', marginLeft: '-90px' }}>
                          {m.content}
                        </p>
                        <p style={{ fontSize: '14px', marginLeft: '-300px' }} >{m.createdAt}</p>
                      </div>

                    ) : (
                      <div >
                        <p style={{ background: 'blue', color: 'white', height: '50px', width: '400px', borderRadius: '80px', textAlign: 'center', marginRight: '-900px' }} >
                          {m.content}
                        </p>
                        <p style={{ fontSize: '14px', marginRight: '-300px' }}  >{m.createdAt}</p>
                      </div>

                    )}


                  </div>
                ))}
                <div style={{ position: 'fixed', bottom: '0', left: '50%', transform: 'translateX(-50%)' }}>

                  <div style={{ display: 'flex' }}>
                    <input style={{ marginRight: '10px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px', width: '400px' }} value={message}
                      onChange={handleChange}
                      type="text"
                    />
                    <button
                      style={{ padding: '8px 16px', border: 'none', borderRadius: '4px', backgroundColor: '#4CAF50', color: 'white', fontSize: '16px' }} onClick={sendMessage}  >
                      Envoyer
                    </button>

                  </div>
                  <input type="hidden" value={temp} />
                </div>


              </div>
            </div>
          </div>
        </div>

        <div className="col-4" style={{ backgroundColor: '#f0f2f5' }}>
          <div style={{ marginTop: '100px' }}></div>
          <div style={{ position: 'fixed' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>Liste des utilisateurs</h3>
            <input type="hidden" value={temp} />
            <div>
              {list.map((user) => (
                <div key={user._id} style={{ display: 'inline-block', marginRight: '10px' }}>
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center border p-2"
                    style={{
                      border: '1px solid red',
                      color: 'white',
                      width: '50px',
                      height: '50px',
                      backgroundColor: 'black',
                      cursor: 'pointer',

                    }}
                    onClick={() => afficher(user._id, user.login)}
                  >
                  
                  </div>
                  {user.login}
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

      <ToastContainer />
    </div>


  );
};

export default Message;
