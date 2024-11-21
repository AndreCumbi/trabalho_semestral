import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function DeleteLivro() {
    const { id } = useParams(); // Captura o parâmetro 'id' da URL
    const navigate = useNavigate(); // Função para redirecionar o usuário

    useEffect(() => {
        // Chama a API para excluir o livro assim que o componente for montado
        axios.delete(`http://localhost:8081/delete/${id}`)
            .then(res => {
                console.log('Livro excluído com sucesso:', res);
                navigate('/'); // Redireciona para a página inicial
            })
            .catch(err => {
                console.error('Erro ao excluir o livro:', err);
            });
    }, [id, navigate]); // Executa o efeito apenas quando 'id' e 'navigate' mudarem

    return (
        <>
        </>
    );
}

export default DeleteLivro;