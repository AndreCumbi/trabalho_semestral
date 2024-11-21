import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Inatro(){
        const [num, setNum] = useState('')
        const nome_doc = 'Carta de Conducao'
        const [nuid, setNuid] = useState('')
        const [detalhes, setDetalhes] = useState('')

    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8081/createDoc',{num, nome_doc, nuid, detalhes})
        .then(res => {
            console.log(res);
            navigate(`/AddDoc`);
        }).catch(err => console.log(err));
    }
    
    return(
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>NOVA CARTA</h2>
                    <div className='mb-2'>
                        <label htmlFor="">Numero da carta</label>
                        <input type='text' placeholder='Numero da carta' className='form-control' 
                        onChange={e => setNum(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">NUID do Cidadao</label>
                        <input type='text' placeholder='NUID do cidadao' className='form-control' 
                        onChange={e => setNuid(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Categoria da carta</label>
                        <input type='text' placeholder='Categoria da carta' className='form-control' 
                        onChange={e => setDetalhes(e.target.value)}
                        />
                    </div>
                    <button className='btn btn-success'>Submeter</button>
                </form>
            </div>
        </div>
    )
}

export default Inatro