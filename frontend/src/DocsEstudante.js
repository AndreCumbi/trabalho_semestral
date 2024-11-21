import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function DocsEstudante() {
  const [bi, setBi] = useState(null); // Inicia como null para verificar carregamento
  const { nuid } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/nome/${nuid}`)
      .then((res) => setBi(res.data))
      .catch((err) => console.error('Erro ao buscar dados:', err));
  }, [nuid]);

  if (!bi) {
    return (
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <h3 className="text-white">A carregar os dados...</h3>
      </div>
    );
  }

  return (
    <>

    <div className="container text-center mt-5">
      <h3 className="mt-3">{bi.nome}</h3>
      <h3 className="mt-3">NUID: {nuid}</h3>

      </div>

      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="bg-white rounded p-3">
          <table className="table">
            <thead>
              <tr>
                <th>Nome do Documento</th>
                <th>Número</th>
                <th>Baixar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bilhete de Identidade</td>
                <td>{bi.num}</td>
                <td>
                  <Link className="btn btn-primary" to={`/download/${bi.num}`}>
                    Baixar
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default DocsEstudante;