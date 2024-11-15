import React from 'react';
import { Table, Button } from 'react-bootstrap';

const Pacientes = ({ pacientes, setConsultas, sincronizarStorage }) => {
  const excluirConsulta = (id) => {
    const novosPacientes = pacientes.filter(paciente => paciente.id_paciente !== id);
    setConsultas(novosPacientes);
    sincronizarStorage('pacintes', novosPacientes); // Sincroniza com o LocalStorage
  };

  return (
    <div>
      <h3>Lista de Pacientes</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Paciente</th>
            <th>Médico</th>
            <th>Data/Hora</th>
            <th>Motivo</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map(consulta => (
            <tr key={consulta.id_consulta}>
              <td>{consulta.id_consulta}</td>
              <td>{consulta.id_paciente}</td>
              <td>{consulta.id_usuario_medico}</td>
              <td>{consulta.data_hora_consulta}</td>
              <td>{consulta.motivo}</td>
              <td>{consulta.status}</td>
              <td>
                <Button 
                  variant="danger" 
                  onClick={() => excluirConsulta(consulta.id_consulta)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Pacientes;