import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

const Funcionarios = ({ funcionarios, setFuncionarios, sincronizarStorage }) => {
  const handleDelete = (cpf) => {
    const updatedFuncionarios = funcionarios.filter((func) => func.cpf !== cpf);
    setFuncionarios(updatedFuncionarios);
    sincronizarStorage('funcionarios', updatedFuncionarios);
  };

  return (
    <div>
      <h1>Gerenciar Funcionários</h1>
      <Link to="/funcionarios/formulario" className="btn btn-primary mb-3">
        Adicionar Funcionário
      </Link>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Cargo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                Nenhum funcionário cadastrado.
              </td>
            </tr>
          ) : (
            funcionarios.map((funcionario) => (
              <tr key={funcionario.cpf}>
                <td>{funcionario.nome}</td>
                <td>{funcionario.cpf}</td>
                <td>{funcionario.telefone}</td>
                <td>{funcionario.cargo}</td>
                <td>
                  <Link
                    to={`/funcionarios/formulario/${funcionario.cpf}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Editar
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(funcionario.cpf)}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Funcionarios;

