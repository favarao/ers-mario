import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Pacientes = ({ pacientes, setConsultas, sincronizarStorage }) => {
  const excluirPaciente = (id) => {
    const novosPacientes = pacientes.filter(paciente => paciente.id_paciente !== id);
    setConsultas(novosPacientes);
    sincronizarStorage('pacientes', novosPacientes); // Sincroniza com o LocalStorage
  };

  return (
    <div>
      <h3>Lista de Pacientes</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Benefício</th>
            <th>Plano de Saúde</th>
            <th>Nome</th>
            <th>Sexo</th>
            <th>Data Nasc.</th>
            <th>Endereço</th>
            <th>Telefone</th>
            <th>Data Falecimento</th>
            <th>Motivo Falecimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map(paciente => (
            <tr key={paciente.id_paciente}>
              <th>{paciente.id_paciente}</th>
              <th>{paciente.beneficio}</th>
              <th>{paciente.plan_saude}</th>
              <th>{paciente.nome}</th>
              <th>{paciente.sexo}</th>
              <th>{paciente.nasc}</th>
              <th>{paciente.end}</th>
              <th>{paciente.tel}</th>
              <th>{paciente.d_falec}</th>
              <th>{paciente.m_falec}</th>
              <td>
                <Button
                  variant="warning"
                  as={Link}
                  to={`/pacientes/formulario/${paciente.id_paciente}`}
                >
                  Editar
                </Button>{' '}
                <Button
                  variant="danger"
                  onClick={() => excluirPaciente(paciente.id_paciente)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div >
  );
};

export default Pacientes;