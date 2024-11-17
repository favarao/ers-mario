import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const FormularioPacientes = ({ pacientes, setPacientes, sincronizarStorage }) => {
    const [form, setForm] = useState({
        beneficio: '',
        plan_saude: '',
        nome: '',
        sexo: 'M',
        nasc: '',
        end: '',
        tel: '',
        d_falec: '',
        m_falec: '',
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

        const novoPaciente = {
            id_paciente: pacientes.length + 1, // Gerar um ID único baseado na quantidade de consultas
            ...form
        };

        const novosPacientes = [...pacientes, novoPaciente];
        setPacientes(novosPacientes);
        sincronizarStorage('consultas', novosPacientes); // Sincroniza com o LocalStorage

        // Limpa o formulário
        setForm({
            beneficio: '',
            plan_saude: '',
            nome: '',
            sexo: 'M',
            nasc: '',
            end: '',
            tel: '',
            d_falec: '',
            m_falec: '',
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

export default FormularioPacientes;