import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CriarUser(){
        const [num, setNum] = useState('')
        const [nome, setNome] = useState('')
        const [data_nasc, setDataNasc] = useState('')
        const [nome_p, setNome_P] = useState('')
        const [nome_m, setNome_M] = useState('')
        const [residencia, setResidencia] = useState('')
        const [altura, setAltura] = useState('')

    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8081/create',{num, nome, data_nasc, nome_p, nome_m, residencia, altura})
        .then(res => {
            const nuid = res.data.nuid
            console.log(res);
            navigate(`/usercriado/${nuid}`);
        }).catch(err => console.log(err));
    }
    
    return(
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Criar Usuario</h2>
                    <div className='mb-2'>
                        <label htmlFor="">Numero do BI</label>
                        <input type='text' placeholder='Numero do BI' className='form-control' 
                        onChange={e => setNum(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Nome</label>
                        <input type='text' placeholder='Nome' className='form-control' 
                        onChange={e => setNome(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Data de nascimento</label>
                        <input type='text' placeholder='Data nascimento' className='form-control' 
                        onChange={e => setDataNasc(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Nome do Pai</label>
                        <input type='text' placeholder='Nome do pai' className='form-control' 
                        onChange={e => setNome_P(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Nome da Mae</label>
                        <input type='text' placeholder='Nome da mae' className='form-control' 
                        onChange={e => setNome_M(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Residencia</label>
                        <input type='text' placeholder='Residencia' className='form-control' 
                        onChange={e => setResidencia(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Altura</label>
                        <input type='text' placeholder='Altura' className='form-control' 
                        onChange={e => setAltura(e.target.value)}/>
                    </div>
                    <button className='btn btn-success'>Submeter</button>
                </form>
            </div>
        </div>
    )
}

export default CriarUser