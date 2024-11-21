import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Uem() {
  const [bi, setBi] = useState(null);
  const [nuid, setNuid] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.get(`http://localhost:8081/nome/${nuid}`);
      const biData = response.data;
  
      console.log('Resposta da API:', biData);
  
      if (Array.isArray(biData)) {
        // Caso biData seja um array
        const b = biData.find((u) => u.nuid == nuid);
        if (b) {
          navigate(`/docsEstudante/${nuid}`);
        } else {
          setErrorMessage('NUID incorreto.');
        }
      } else if (biData && biData.NUID == nuid) {
        // Caso biData seja um objeto único
        navigate(`/docsEstudante/${nuid}`);
      } else {
        setErrorMessage('NUID incorreto.');
      }
    } catch (error) {
      console.error('Erro ao consultar os dados:', error);
      setErrorMessage('Erro ao consultar os dados.');
    }
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleClick}>
          <h2>Consultar Documentos, Módulo da UEM</h2>
          <div className="mb-2">
            <label htmlFor="nuidInput">NUID do Cidadão</label>
            <input
              id="nuidInput"
              type="text"
              placeholder="NUID do cidadão"
              className="form-control"
              onChange={(e) => setNuid(e.target.value)}
              value={nuid}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Consultar
          </button>
          {errorMessage && (
            <div className="alert alert-danger mt-2">{errorMessage}</div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Uem;