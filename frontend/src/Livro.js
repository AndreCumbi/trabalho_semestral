import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'



function Livro(){

    const [livro, setLivro] = useState([])

    const handleClickVenda = (id) => {
        axios.put('http://localhost:8081/comprar/'+id)
        .then(res => {
            console.log(res);
        }).catch(err => console.log(err));
            //alert(`Comprou o livro: ${livro.titulo} com sucesso`);
        
    };

    const handleClickAluguer = (id) => {
        axios.put('http://localhost:8081/comprar/'+id)
        .then(res => {
            console.log(res);
        }).catch(err => console.log(err));
         //   alert(`Alugou o Livro: ${livro.titulo} com sucesso`);
        
    };

    useEffect(()=>{
        axios.get('http://localhost:8081/')
        .then(res => setLivro(res.data))
        .catch(err => console.log(err))
    }, [])

    return(
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='bg-white rounded'>
                <Link to="create" className='btn btn-success' >Adicionar</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Autor</th>
                            {/*<th>Descricao</th>*/}
                            <th>Preco</th>
                            <th>Acoes</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                livro.map((data, i) => (
                                    <tr key = {i}>
                                        <td>{data.titulo}</td>
                                        <td>{data.autor}</td>
                                        {/*<td>{data.descricao}</td>*/}
                                        <td>{data.preco}</td>
                                        <td>
                                            <Link to={`detalhes/${data.id}`} className="btn btn-primary">Detalhes</Link>
                                            {/*<Link to={`delete/${data.id}`} className="btn btn-danger ms-2">Apagar</Link>*/}
                                            <Link to={`comprar/${data.id}`} className="btn btn-primary ms-2">Comprar</Link>
                                            <Link to={`comprar/${data.id}`} className="btn btn-primary ms-2">Alugar</Link>

                                        </td>
                                    </tr>
                                ))
                            }
                    </tbody>
                </table>
            </div>            
        </div>
    )
}

export default Livro