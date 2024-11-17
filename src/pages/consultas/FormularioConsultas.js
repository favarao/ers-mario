import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { useEffect } from 'react';

const FormularioConsultas = ({ consultas, setConsultas, sincronizarStorage }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id_consulta: '',
    id_paciente: '',
    id_usuario_medico: '',
    data_hora_consulta: '',
    data_agendamento: '',
    motivo: '',
    status: '1'
  });

  useEffect(() => {
    if (id) {
      const consultaExistente = consultas.find(consulta => consulta.id_consulta === parseInt(id));
      if (consultaExistente) {
        setForm(consultaExistente);
      }
    }
  }, [id, consultas]);

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

    if (form.id_consulta!== '') {
      const index = consultas.findIndex(consulta => consulta.id_consulta === form.id_consulta);
      if (index !== -1) {
        consultas[index] = form;
        setConsultas([...consultas]);
        sincronizarStorage('consultas', consultas);
      }
    }
    else
    {
      form.id_consulta = consultas.length+1;
      const novaConsulta = {
        ...form
      };


    const novasConsultas = [...consultas, novaConsulta];
    setConsultas(novasConsultas);
    sincronizarStorage('consultas', novasConsultas); // Sincroniza com o LocalStorage
  }
    // Limpa o formulário
    // setForm({
    //   id_consulta: '',
    //   id_paciente: '',
    //   id_usuario_medico: '',
    //   data_hora_consulta: '',
    //   data_agendamento: '',
    //   motivo: '',
    //   status: '1'
    // });
    
    navigate('/consultas');
  };

  return (
    <div>
      <h3>Cadastrar Nova Consulta</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          type="hidden"
          name="id_consulta"
          value={form.id_consulta}
        />
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
            <option value="1">Agendada</option>
            <option value="2">Cancelada</option>
            <option value="3">Concluída</option>
          </Form.Select>
        </Form.Group>

        {error && <Alert variant="danger">{error}</Alert>}

        <Button variant="success" type="submit">
          Salvar
        </Button>
      </Form>
    </div>
  );
};

export default FormularioConsultas;