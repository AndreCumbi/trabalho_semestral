import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, link } from 'react-router-dom';

function DetalhesBi() {
    const [doc, setDoc] = useState(null);
    const { num } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:8081/detalhesBi/${num}`)
            .then(res => setDoc(res.data))
            .catch(err => console.log(err));
    }, [num]);

    if (!doc) {
        return (
            <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
                <div className='bg-white rounded p-5'>
                    <h3>A carregar os detalhes do Documento...</h3>
                </div>
            </div>
        );
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='bg-white rounded p-5'>
                <h1>Bilhete de Identidade</h1>
                <p><strong>Numero:</strong> {num}</p>
                <p><strong>Nome:</strong> {doc.nome}</p>
                <p><strong>Data de nascimento:</strong> {doc.data_nasc}</p>
                <p><strong>Nome do pai:</strong> {doc.nome_p}</p>
                <p><strong>Nome da mae:</strong> {doc.nome_m}</p>
                <p><strong>Residencia:</strong> {doc.residencia}</p>
                <p><strong>Altura:</strong> {doc.altura}</p>
            </div>
        </div>
    );
}

export default DetalhesBi;