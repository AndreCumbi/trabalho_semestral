import React, { useState, useEffect } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [nuid, setNuid] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if(username == 'uem' && password == 'uem'){
      navigate(`/uem`);
    }

    if(username == 'inatro' && password == 'inatro'){
        navigate(`/inatro`);
    }
    if(username == 'admin' && password == 'admin'){
            navigate(`/admin`);
    }
    // Validar credenciais
    const user = users.find(
      (u) => u.username == username && u.senha == password
    );
  
    if (user) {
      try {
        // Fazer a requisição para obter o NUID
        const response = await axios.get(`http://localhost:8081/nd/${username}`);
        const nuid = response.data.NUID;
  
        if (nuid) {
          // Redirecionar após obter o NUID
          navigate(`/usuario/${nuid}`);
        } else {
          setErrorMessage("Erro ao obter o NUID.");
        }
      } catch (error) {
        console.error("Erro ao buscar o NUID:", error);
        setErrorMessage("Erro no servidor ao obter o NUID.");
      }
    } else {
      // Exibir mensagem de erro
      setErrorMessage("Username ou senha incorretos.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ width: "350px" }}>
        <h3 className="text-center mb-4">Login</h3>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;