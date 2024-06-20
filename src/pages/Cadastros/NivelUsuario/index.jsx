import React, { useState, useEffect } from 'react'
import Container from '../../../components/Container';
import Main from '../../../components/Main';
import Titulo from '../../../components/Titulo';
import Table from '../../../components/Table';
import Thead from '../../../components/Thead';
import Tr from '../../../components/Tr';
import Th from '../../../components/Th';
import Tbody from '../../../components/Tbody';
import Td from '../../../components/Td';
import Button from '../../../components/Button';
import Form from '../../../components/Form';
import FormGroup from '../../../components/FormGroup';
import Label from '../../../components/Label';
import Input from '../../../components/Input';
import FormRadio from '../../../components/FormRadio';
import Span from '../../../components/Span';
import Pagination from '../../../components/Pagination';
import Navigator from '../../../components/Navigator';
import Select from '../../../components/Select';
import { FaEdit, FaToggleOff, FaToggleOn, FaTrash } from 'react-icons/fa';

const initialForms = ({ id: 0, codigo: '', nome: '', ativo: true });
const NivelUsuario = () => {
    const [nivelUsuario, setNivelUsuario] = useState(initialForms);
    const [items, setItems] = useState([]);

    const getNivelUsuario = () => {
        fetch("http://localhost:8080/api/nivelusuario")
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.log("Erro ao consultar" + error))
    }

    useEffect(() => {
        getNivelUsuario();
    }, []);

    //Pagination
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const startIndex = itemsPerPage * currentPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);
    const pages = Math.ceil(items.length / itemsPerPage);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNivelUsuario({ ...nivelUsuario, [name]: value });
    }

    const handleRadio = (e) => {
        const isSelected = e.target.value === "true" ? true : false;
        setNivelUsuario({ ...nivelUsuario, ativo: isSelected });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nivelUsuario.id === 0) {
            fetch("http://localhost:8080/api/nivelusuario", {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(nivelUsuario),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then((data) => {
                    if (data) {
                        getNivelUsuario();
                    }
                })

        }
        else {
            const id = nivelUsuario.id;

            fetch(`http://localhost:8080/api/nivelusuario/${id}`, {
                method: "PUT",
                mode: "cors",
                body: JSON.stringify(nivelUsuario),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then((data) => {
                    if (data) {
                        getNivelUsuario();
                    }
                })
        }
        setNivelUsuario(initialForms);
    }

    const handleUpdate = (id) => {
        fetch(`http://localhost:8080/api/nivelusuario/${id}`)
            .then(response => response.json())
            .then(data => setNivelUsuario(data))
            .catch(error => console.log("Erro ao consultar " + error))

    }

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/nivelusuario/${id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then((data) => {
                if (data) {
                    getNivelUsuario();
                    setNivelUsuario(initialForms);
                }
            })
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setNivelUsuario(initialForms);
    }

    useEffect(() => {
        setCurrentPage(0);
    }, [itemsPerPage]);

    return (
        <>
            <Container>
                <Main>
                    <Titulo title="Cadastro de Nível Usuário" />
                    <Form>
                        <FormGroup>
                            <Label name="Código">
                                <Input type="text" name="codigo" value={nivelUsuario.codigo} placeholder="Informe o código" onchange={handleChange} />
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label name="Nome">
                                <Input type="text" name="nome" value={nivelUsuario.nome} placeholder="Informe o nome" onchange={handleChange} />
                            </Label>
                        </FormGroup>
                        <FormRadio>
                            <Label name="Ativo" />
                            <Input type="radio" name="ativo" value="true" valorSelecionado={nivelUsuario.ativo === true} onchange={handleRadio} /><Span name="Sim" />
                            <Input type="radio" name="ativo" value="false" valorSelecionado={nivelUsuario.ativo === false} onchange={handleRadio} /><Span name="Não" />
                        </FormRadio>
                        <Button name="Cadastrar" classe="botao cadastrar" onclick={handleSubmit} />
                        <Button name="Cancelar" classe="botao cancelar" onclick={handleCancel} />
                    </Form>
                </Main>
                <Main>
                    <Titulo title="Lista de Nível Usuário" />
                    <Navigator>
                        <FormGroup>
                            <Label>
                                <Select value={itemsPerPage} onchange={(e) => setItemsPerPage(Number(e.target.value))}>
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
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
                                <Th name="Código" />
                                <Th name="Nome" />
                                <Th name="Ativo" />
                                <Th name="Ações" />
                            </Tr>
                        </Thead>
                        <Tbody>
                            {items.map((item) => (
                                <Tr key={item.id}>
                                    <Td>{item.codigo}</Td>
                                    <Td>{item.nome}</Td>
                                    <Td>{item.ativo ? <FaToggleOn className='toggleOn' /> : <FaToggleOff className='toggleOff' />}</Td>
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
                                return <Button classe={Number(index) === currentPage ? "botao btnPagination active" : "botao btnPagination"} key={index} name={Number(index) + 1} value={Number(index)} onclick={(e) => setCurrentPage(Number(e.target.value))} />
                            })}
                        </Pagination>
                    )}
                </Main>
            </Container>
        </>
    )
}

export default NivelUsuario