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
import Pagination from '../../../components/Pagination';
import Navigator from '../../../components/Navigator';
import { FaEdit, FaToggleOff, FaToggleOn, FaTrash } from 'react-icons/fa';

const data = new Date();
const ano = data.getFullYear();
const mes = ("0" + (data.getMonth() + 1)).slice(-2);
const dia = data.getDate();
const dataAtual = ano + "-" + mes + "-" + dia;

const dataVencimento = new Date(data.setMonth(data.getMonth() + 3));

const initialForms = ({ id: 0, nome: '', usuario: '', email: '', cpf: '', dataCadastro: dataAtual, dataVencimento: dataVencimento.toLocaleDateString('fr-CA'), senha: '', ativo: true })

const Usuario = () => {



    const [usuario, setUsuario] = useState(initialForms);
    const [niveisUsuarios, setNiveisUsuarios] = useState([]);
    const [items, setItems] = useState([]);
    const [niveisDoUsuario, setNiveisDoUsuario] = useState([]);
    const [confirmeSenha, setConfirmeSenha] = useState("");

    const [idSelecionado, setIdSelecionado] = useState(0);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState("");

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

    //Paginação
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(0);
    const startIndex = itemsPerPage * currentPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);
    const pages = Math.ceil(items.length / itemsPerPage)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario({ ...usuario, [name]: value });
    }

    const handleRadio = (e) => {
        const isSelected = e.target.value === "true" ? true : false;
        setUsuario({ ...usuario, ativo: isSelected });
    }

    const handleUpdate = (id) => {
        fetch(`http://localhost:8080/api/usuario/${id}`)
            .then(response => response.json())
            .then(data => setUsuario(data))
            .catch(error => console.log("Erro ao consultar o usuário " + error));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (usuario.id === 0) {

            fetch(`http://localhost:8080/api/usuario/`, {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(usuario),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then((data) => {
                    if (data) {
                        getUsuario();
                    }
                })
        }
        else {
            const id = usuario.id;

            console.log(id, usuario)
            fetch(`http://localhost:8080/api/usuario/${id}`, {
                method: "PUT",
                mode: "cors",
                body: JSON.stringify(usuario),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then((data) => {
                    if (data) {
                        getUsuario();
                    }
                })

        }

        setUsuario(initialForms);
        setConfirmeSenha("");

    }

    const handleCancel = (e) => {
        e.preventDefault();
        setUsuario(initialForms);
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/usuario/${id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then((data) => {
                if (data) {
                    getUsuario();
                    setUsuario(initialForms);
                }
            })

    }

    const handleUserSelected = (item) => {
        const id = item.id;

        setIdSelecionado(id);
        setUsuarioSelecionado(item.nome);

        fetch(`http://localhost:8080/api/nivelusuario/niveis/${id}`)
            .then(response => response.json())
            .then(data => setNiveisDoUsuario(data))
            .catch(error => console.log("Erro ao consultar" + error));

    }

    useEffect(() => {
        setCurrentPage(0);
        setIdSelecionado(0);
        setNiveisDoUsuario("");
    }, [itemsPerPage])

    useEffect(() => {
        setIdSelecionado(0);
        setNiveisDoUsuario("");
    }, [currentPage])

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
                        </FormGroup>
                        {usuario.id === 0 && (
                            <FormGroup>
                                <Label name="Senha">
                                    <Input type="password" name="senha" value={usuario.senha} placeholder="Informe a senha" onchange={handleChange} />
                                </Label>
                                <Label name="Confirme Senha">
                                    <Input type="password" value={confirmeSenha} name="confirmeSenha" placeholder="Confirme a senha" onchange={(e) => setConfirmeSenha(e.target.value)} />
                                </Label>
                            </FormGroup>
                        )}
                        <FormRadio>
                            <Label name="Ativo" />
                            <Input type="radio" name="ativo" value="true" valorSelecionado={usuario.ativo === true} onchange={handleRadio} /><Span name="Sim" />
                            <Input type="radio" name="ativo" value="false" valorSelecionado={usuario.ativo === false} onchange={handleRadio} /><Span name="Não" />
                        </FormRadio>
                        <FormGroup>
                            <Input type="hidden" name="dataCadastro" value={new Date(usuario.dataCadastro).toLocaleDateString('fr-CA')} onchange={handleChange} />
                            <Input type="hidden" name="dataVencimento" value={new Date(usuario.dataVencimento).toLocaleDateString('fr-CA')} onchange={handleChange} />
                        </FormGroup>
                        <Button name="Cadastrar" classe="botao cadastrar" onclick={handleSubmit} />
                        <Button name="Cancelar" classe="botao cancelar" onclick={handleCancel} />
                    </Form>
                </Main>
                <Main>
                    <Titulo title="Lista de Usuários" />
                    <Navigator>
                        <FormGroup>
                            <Label>
                                <Select value={itemsPerPage} onchange={(e) => setItemsPerPage(Number(e.target.value))}>
                                    <option value={1}>1</option>
                                    <option value={3}>3</option>
                                    <option value={5}>5</option>
                                </Select>
                            </Label>
                            <Label>
                                <Input type="text" name="pesquisar" placeholder="Pesquisar" />
                            </Label>
                        </FormGroup>
                    </Navigator>
                    <Table classe="tabela">
                        <Thead>
                            <Tr>
                                <Th />
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
                            {currentItems.map((item, index) => (
                                <Tr key={index} onclick={() => handleUserSelected(item)}>
                                    <Td>
                                        <Input type="radio" name="idSelecionado" valorSelecionado={idSelecionado === item.id ? true : false} onchange={() => handleUserSelected(item)} />
                                    </Td>
                                    <Td>{item.nome}</Td>
                                    <Td>{item.usuario}</Td>
                                    <Td>{item.cpf}</Td>
                                    <Td>{item.email}</Td>
                                    <Td>{new Date(item.dataCadastro).toLocaleDateString('pt-BR')}</Td>
                                    <Td>{item.ativo ? <FaToggleOn className='toggleOn'/> : <FaToggleOff className='toggleOff'/>}</Td>
                                    <Td>
                                        <FaEdit className='edit' onClick={() => handleUpdate(item.id)} />
                                        <FaTrash className='delete' onClick={() => handleDelete(item.id)} />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                    {pages > 1 && (
                        <Pagination>
                            {Array.from(Array(pages), (item, index) => {
                                return <Button key={index} classe={Number(index) === currentPage ? "botao btnPagination active" : "botao btnPagination"} name={Number(index) + 1} value={Number(index)} onclick={(e) => setCurrentPage(Number(e.target.value))} />
                            })}
                        </Pagination>
                    )}
                </Main>
                {niveisDoUsuario.length > 0 && (
                    <Main>
                        <Titulo title={`Níveis do usuário: ${usuarioSelecionado}`} />
                        <Table classe="tabela">
                            <Thead>
                                <Tr>
                                    <Th name="Codigo" />
                                    <Th name="Nome" />
                                    <Th name="Ativo" />
                                </Tr>
                            </Thead>
                            <Tbody>
                                {niveisDoUsuario.map((item, index) => (
                                    <Tr key={index}>
                                        <Td>{item.codigo}</Td>
                                        <Td>{item.nome}</Td>
                                        <Td>{item.ativo ? "Sim" : "Não"}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Main>
                )}
            </Container>
        </>
    )
}

export default Usuario