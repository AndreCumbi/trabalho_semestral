import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function ActivarLivro() {
    const { id } = useParams(); // Captura o parâmetro 'id' da URL
    const navigate = useNavigate(); // Função para redirecionar o usuário

    useEffect(() => {
        // Chama a API para excluir o livro assim que o componente for montado
        axios.put(`http://localhost:8081/comprar/${id}`)
            .then(res => {
                console.log('Livro activado com sucesso:', res);
                navigate('/'); // Redireciona para a página inicial
            })
            .catch(err => {
                console.error('Erro ao activar o livro:', err);
            });
    }, [id, navigate]); 

    return (
        <>
        </>
    );
}

export default ActivarLivro;