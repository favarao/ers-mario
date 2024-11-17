import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const FormularioConsultas = ({ consultas, setConsultas, sincronizarStorage }) => {
  const [form, setForm] = useState({
    id_paciente: '',
    id_usuario_medico: '',
    data_hora_consulta: '',
    data_agendamento: '',
    motivo: '',
    status: 'Agendada'
  });

  const [error, setError] = useState('');

  // Função para lidar com mudanças nos campos do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Função para validar o formulário
  const validateForm = () => {
    if (!form.id_paciente || !form.id_usuario_medico || !form.data_hora_consulta || !form.motivo) {
      setError('Todos os campos obrigatórios devem ser preenchidos!');
      return false;
    }
    setError('');
    return true;
  };

  // Função para enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validando o formulário antes de submeter
    if (!validateForm()) return;

    const novaConsulta = {
      id_consulta: consultas.length + 1, // Gerar um ID único baseado na quantidade de consultas
      ...form
    };

    const novasConsultas = [...consultas, novaConsulta];
    setConsultas(novasConsultas);
    sincronizarStorage('consultas', novasConsultas); // Sincroniza com o LocalStorage

    // Limpa o formulário
    setForm({
      id_paciente: '',
      id_usuario_medico: '',
      data_hora_consulta: '',
      data_agendamento: '',
      motivo: '',
      status: 'Agendada'
    });
  };

  return (
    <div>
      <h3>Cadastrar Nova Consulta</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formPaciente">
          <Form.Label>ID do Paciente</Form.Label>
          <Form.Control
            type="text"
            name="id_paciente"
            value={form.id_paciente}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formMedico">
          <Form.Label>ID do Médico</Form.Label>
          <Form.Control
            type="text"
            name="id_usuario_medico"
            value={form.id_usuario_medico}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDataHora">
          <Form.Label>Data e Hora da Consulta</Form.Label>
          <Form.Control
            type="datetime-local"
            name="data_hora_consulta"
            value={form.data_hora_consulta}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDataAgendamento">
          <Form.Label>Data do Agendamento</Form.Label>
          <Form.Control
            type="date"
            name="data_agendamento"
            value={form.data_agendamento}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formMotivo">
          <Form.Label>Motivo</Form.Label>
          <Form.Control
            as="textarea"
            name="motivo"
            value={form.motivo}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formStatus">
          <Form.Label>Status</Form.Label>
          <Form.Select
            name="status"
            value={form.status}
            onChange={handleInputChange}
          >
            <option value="Agendada">Agendada</option>
            <option value="Cancelada">Cancelada</option>
            <option value="Concluída">Concluída</option>
          </Form.Select>
        </Form.Group>

        {/* {error && <Alert variant="danger">{error}</Alert>} */}

        <Button variant="success" type="submit">
          Salvar
        </Button>
      </Form>
    </div>
  );
};

export default FormularioConsultas;