import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Accueil from './pages/Accueil';
import Create from './pages/Create';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbare from './pages/Navbare';
import Contact from './pages/Contact';
import Message from './pages/Message';
import About from './pages/About';
import Inscrit from './pages/Inscrit';
import NavbareAdmin from './pages/NavbareAdmin';

import { BrowserRouter, Routes, Route } from 'react-router-dom';



const App = () => {

    return (
        <div>

            <BrowserRouter>
                <Routes>
                  //  <Route path="/" element={<Login />} />
                    <Route path="/accueil" element={<Accueil />} />
                    <Route path='/create' element={<Create />} />
                    <Route path='/Navbare' element={<Navbare />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/message' element={<Message />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/inscription' element={<Inscrit />} />
                    <Route path='/NavbareAdmin' element={<NavbareAdmin />} />
                </Routes>
                <ToastContainer />
            </BrowserRouter>
        </div>
    );
};

export default App;
