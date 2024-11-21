import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, link } from 'react-router-dom';

function DetalhesDoc() {
    const [doc, setDoc] = useState(null);
    const { cod_doc } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:8081/detalhesDoc/${cod_doc}`)
            .then(res => setDoc(res.data))
            .catch(err => console.log(err));
    }, [cod_doc]);

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
                <h1>{doc.nome_doc}</h1>
                <p><strong>Numero:</strong> {cod_doc}</p>
                <p><strong>Descrição:</strong> {doc.detalhes}</p>
            </div>
        </div>
    );
}

export default DetalhesDoc;