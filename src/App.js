import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavbarComponent from './components/Navbar';
import Usuarios from './pages/Usuarios';
import FormularioUsuarios from './pages/FormularioUsuarios';
import Pacientes from './pages/Pacientes';
import FormularioPacientes from './pages/FormularioPacientes';
import Consultas from './pages/Consultas';
import FormularioConsultas from './pages/FormularioConsultas';
import Home from './pages/Home';

const App = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [consultas, setConsultas] = useState([]);

  // Carregar dados do LocalStorage ao iniciar
  useEffect(() => {
    const usuariosStorage = JSON.parse(localStorage.getItem('usuarios')) || [];
    const pacientesStorage = JSON.parse(localStorage.getItem('pacientes')) || [];
    const consultasStorage = JSON.parse(localStorage.getItem('consultas')) || [];
    setUsuarios(usuariosStorage);
    setPacientes(pacientesStorage);
    setConsultas(consultasStorage);
  }, []);

  // Função para sincronizar dados no LocalStorage
  const sincronizarStorage = (chave, dados) => {
    localStorage.setItem(chave, JSON.stringify(dados));
  };

  return (
    <Router>
      <NavbarComponent />
      <Container className="mt-3">
        <Routes>
          <Route path="/home" element={<Home/>}/>
          {/* <Route
            path="/usuarios"
            element={<Usuarios usuarios={usuarios} setUsuarios={setUsuarios} sincronizarStorage={sincronizarStorage} />}
          />
          <Route
            path="/usuarios/formulario"
            element={<FormularioUsuarios usuarios={usuarios} setUsuarios={setUsuarios} sincronizarStorage={sincronizarStorage} />}
          />
          <Route
            path="/pacientes"
            element={<Pacientes pacientes={pacientes} setPacientes={setPacientes} sincronizarStorage={sincronizarStorage} />}
          />
          <Route
            path="/pacientes/formulario"
            element={<FormularioPacientes pacientes={pacientes} setPacientes={setPacientes} sincronizarStorage={sincronizarStorage} />}
          /> */}

          
          <Route
            path="/consultas"
            element={<Consultas consultas={consultas} setConsultas={setConsultas} sincronizarStorage={sincronizarStorage} />}
          />
          <Route
            path="/consultas/formulario"
            element={<FormularioConsultas consultas={consultas} setConsultas={setConsultas} sincronizarStorage={sincronizarStorage} />}
          />

          <Route
            path="/consultas/formulario/:id"
            element={<FormularioConsultas consultas={consultas} setConsultas={setConsultas} sincronizarStorage={sincronizarStorage} />}
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;