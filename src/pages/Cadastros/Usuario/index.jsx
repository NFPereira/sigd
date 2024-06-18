import React, { useEffect, useState } from 'react'
import Container from '../../../components/Container';
import Main from '../../../components/Main';
import Titulo from '../../../components/Titulo';
import Table from '../../../components/Table';
import Thead from '../../../components/Thead';
import Th from '../../../components/Th';
import Tr from '../../../components/Tr';
import Tbody from '../../../components/Tbody';
import Td from '../../../components/Td';
import Button from '../../../components/Button';
import Form from '../../../components/Form';
import FormGroup from '../../../components/FormGroup';
import Label from '../../../components/Label';
import Input from '../../../components/Input';
import FormRadio from '../../../components/FormRadio';
import Span from '../../../components/Span';
import Select from '../../../components/Select';

const data = new Date();
const ano = data.getFullYear();
const mes = ("0" + (data.getMonth() + 1)).slice(-2);
const dia = data.getDate();
const dataAtual = ano + "-" + mes + "-" + dia;

const initialForms = ({ id: 0, nome: '', usuario: '', idNivelUsuario: 0, email: '', cpf: '', dataCadastro: dataAtual, dataBloqueio: '', dataVencimento: '', senha: '', ativo: true })

const Usuario = () => {
    const [usuario, setUsuario] = useState(initialForms);
    const [niveisUsuarios, setNiveisUsuarios] = useState([]);
    const [items, setItems] = useState([]);

    const getUsuario = () => {
        fetch("http://localhost:8080/api/usuario")
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.log("Erro ao consultar" + error));
    }

    const getNivelUsuario = () => {
        fetch("http://localhost:8080/api/nivelusuario")
            .then(response => response.json())
            .then(data => setNiveisUsuarios(data))
            .catch(error => console.log("Erro ao consultar o Nível de Usuário" + error))
    }

    useEffect(() => {
        getUsuario();
        getNivelUsuario();
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario({ ...usuario, [name]: value });
    }

    const handleRadio = (e) => {
        const isSelected = e.target.value === "true" ? true : false;
        setUsuario({ ...usuario, ativo: isSelected });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const handleCancel = (e) =>{
        e.preventDefault();
        setUsuari(initialForms);
    }

    return (
        <>
            <Container>
                <Main>
                    <Titulo title="Cadastro de Usuário" />
                    <Form>
                        <FormGroup>
                            <Label name="Nome">
                                <Input type="text" name="nome" value={usuario.nome} placeholder="Informe o nome" onchange={handleChange} />
                            </Label>
                            <Label name="Usuário">
                                <Input type="text" name="usuario" value={usuario.usuario} placeholder="Informe o usuário" onchange={handleChange} />
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label name="CPF">
                                <Input type="text" name="cpf" value={usuario.cpf} placeholder="Informe o cpf" onchange={handleChange} />
                            </Label>
                            <Label name="E-mail">
                                <Input type="text" name="email" value={usuario.email} placeholder="Informe o e-mail" onchange={handleChange} />
                            </Label>
                            <Label name="Nível Usuário">
                                <Select name="idNivelUsuario" value={usuario.idNivelUsuario} onchange={handleChange}>
                                    <option value="">SELECIONE</option>
                                    {niveisUsuarios.map((nivelUsuario, index) => (
                                        <option key={index} value={nivelUsuario.id}>{nivelUsuario.nome}</option>
                                    ))}
                                </Select>
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label name="Senha">
                                <Input type="password" name="senha" value={usuario.cpf} placeholder="Informe a senha" onchange={handleChange} />
                            </Label>
                            <Label name="Confirme Senha">
                                <Input type="password" name="confirmesenha" placeholder="Confirme a senha" />
                            </Label>
                        </FormGroup>
                        <FormRadio>
                            <Label name="Ativo" />
                            <Input type="radio" name="ativo" value="true" valorSelecionado={usuario.ativo === true} onchange={handleRadio} /><Span name="Sim" />
                            <Input type="radio" name="ativo" value="false" valorSelecionado={usuario.ativo === false} onchange={handleRadio} /><Span name="Não" />
                        </FormRadio>
                        <FormGroup>
                            <Input type="hidden" name="dataCadastro" value={usuario.dataCadastro} onchange={handleChange} />
                        </FormGroup>
                        <Button name="Cadastrar" classe="botao cadastrar" onclick={handleSubmit} />
                        <Button name="Cancelar" classe="botao cancelar" onclick={handleCancel} />
                    </Form>
                </Main>
                <Main>
                    <Titulo title="Lista de Usuários" />
                    <Table classe="tabela">
                        <Thead>
                            <Tr>
                                <Th name="Nome" />
                                <Th name="Usuário" />
                                <Th name="CPF" />
                                <Th name="E-mail" />
                                <Th name="Data Cadastro" />
                                <Th name="Ativo" />
                                <Th name="Ações" />
                            </Tr>
                        </Thead>
                        <Tbody>
                            {items.map((item, index) => (
                                <Tr key={index}>
                                    <Td>{item.nome}</Td>
                                    <Td>{item.usuario}</Td>
                                    <Td>{item.cpf}</Td>
                                    <Td>{item.email}</Td>
                                    <Td>{new Date(item.dataCadastro).toLocaleDateString('pt-BR')}</Td>
                                    <Td>{item.ativo ? "Sim" : "Não"}</Td>
                                    <Td>
                                        <Button name="Editar" classe="botao editar" />
                                        <Button name="Excluir" classe="botao remover" />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Main>
            </Container>
        </>
    )
}

export default Usuario