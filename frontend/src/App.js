import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CriarUser from './CriarUser';
import UsuarioCriado from './UsuarioCriado';
import Login from './login';
import Usuario from './Usuario';
import DetalhesDoc from './DetalhesDoc';
import DetalhesBi from './DetalhesBi';
import Inatro from './Inatro';
import AddDoc from './AddDoc';
import Uem from './Uem';
import DocsEstudante from './DocsEstudante';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Login />}></Route>
          <Route path='/admin' element={<CriarUser />}></Route>
          <Route path='/usuario/:nuid'  element={<Usuario/>} ></Route>
          <Route path="/usercriado/:nuid" element={<UsuarioCriado/>}></Route>
         <Route path='/usuario/:nuid/detalhes/:cod_doc'  element={<DetalhesDoc/>} ></Route>
         <Route path='/usuario/:nuid/detalhesbi/:num'  element={<DetalhesBi/>} ></Route>
         <Route path='/inatro' element={<Inatro/>}></Route>
         <Route path='/AddDoc' element={<AddDoc/>}></Route>
         <Route path='/uem' element={<Uem/>}></Route>
         <Route path='/docsEstudante/:nuid' element={<DocsEstudante/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
 
          