import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, link } from 'react-router-dom';

function UsuarioCriado() {
    const [user, setUser] = useState(null);
    const { nuid } = useParams();
    const [name, setName] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:8081/credenciais/${nuid}`)
            .then(res => setUser(res.data))
            .catch(err => console.log(err));
    }, [nuid]);

    useEffect(() => {
        axios
            .get(`http://localhost:8081/nome/${nuid}`)
            .then(res => setName(res.data))
            .catch(err => console.log(err));
    }, [nuid]);

    if (!user) {
        return (
            <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
                <div className='bg-white rounded p-5'>
                    <h3>A carregar os detalhes do utilizador</h3>
                </div>
            </div>
        );
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='bg-white rounded p-5'>
                <h1>Utilizador Criado</h1>
                
                <p><strong>NUID:</strong> {nuid}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Senha:</strong> {user.senha}</p>
            </div>
        </div>
    );
}

export default UsuarioCriado;