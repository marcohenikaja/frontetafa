import React from 'react';
import Navbare from './Navbare';

const Contact = (props) => {
    
    return (
        <div>
            <div style={{ marginTop: '100px' }}></div>
            <Navbare/>
            <h3>Contact</h3>
            <p>{props.message}</p>
        </div>
    );
};

export default Contact;
