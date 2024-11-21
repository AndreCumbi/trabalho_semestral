import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function DesactivarLivro() {
    const { id } = useParams(); // Captura o parâmetro 'id' da URL
    const navigate = useNavigate(); // Função para redirecionar o usuário

    useEffect(() => {
        // Chama a API para excluir o livro assim que o componente for montado
        axios.put(`http://localhost:8081/desactivar/${id}`)
            .then(res => {
                console.log('Livro desactivado com sucesso:', res);
                navigate('/'); // Redireciona para a página inicial
            })
            .catch(err => {
                console.error('Erro ao desactivar o livro:', err);
            });
    }, [id, navigate]); // Executa o efeito apenas quando 'id' e 'navigate' mudarem

    return (
        <>
        </>
    );
}

export default DesactivarLivro;