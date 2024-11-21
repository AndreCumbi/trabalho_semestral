import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, link } from 'react-router-dom';

function DetalhesLivro() {
    const [livro, setLivro] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:8081/detalhes/${id}`)
            .then(res => setLivro(res.data))
            .catch(err => console.log(err));
    }, [id]);

    if (!livro) {
        return (
            <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
                <div className='bg-white rounded p-5'>
                    <h3>A carregar os detalhes do livro...</h3>
                </div>
            </div>
        );
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='bg-white rounded p-5'>
                <h1>{livro.titulo}</h1>
                <p><strong>Disponibilidade:</strong> {livro.stock} unidades</p>
                <p><strong>Descrição:</strong> {livro.descricao}</p>
                <p><strong>Preço:</strong> {livro.preco} MZN</p>
                <p><strong>Taxa de Aluguer:</strong> {livro.taxa_aluguer} MZN por dia</p>
            </div>
        </div>
    );
}

export default DetalhesLivro;