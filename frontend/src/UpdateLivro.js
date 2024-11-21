import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateLivro(){
        const [titulo, setTitulo] = useState('')
        const [autor, setAutor] = useState('')
        const [descricao, setDescricao] = useState('')
        const [preco, setPreco] = useState('')
        const {id} = useParams();

    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.put('http://localhost:8081/update/'+id,{titulo, autor, descricao, preco})
        .then(res => {
            console.log(res);
            navigate('/');
        }).catch(err => console.log(err));
    }
    
    return(
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Actualizar Livro</h2>
                    <div className='mb-2'>
                        <label htmlFor="">Titulo</label>
                        <input type='text' placeholder='Titulo do livro' className='form-control' 
                        onChange={e => setTitulo(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Autor</label>
                        <input type='text' placeholder='Autor do livro' className='form-control' 
                        onChange={e => setAutor(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Descricao</label>
                        <input type='text' placeholder='Descricao' className='form-control' 
                        onChange={e => setDescricao(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Preco</label>
                        <input type='text' placeholder='Preco do livro' className='form-control' 
                        onChange={e => setPreco(e.target.value)}/>
                    </div>
                    <button className='btn btn-success'>Actualizar</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateLivro