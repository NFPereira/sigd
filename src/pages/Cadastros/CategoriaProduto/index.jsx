import React, { useState, useEffect } from 'react'
import Container from '../../../components/Container';
import Main from '../../../components/Main';
import Titulo from '../../../components/Titulo';
import Form from '../../../components/Form';
import FormGroup from '../../../components/FormGroup';
import Label from '../../../components/Label';
import Input from '../../../components/Input';
import FormRadio from '../../../components/FormRadio';
import Span from '../../../components/Span';
import Button from '../../../components/Button';
import Table from '../../../components/Table';
import Thead from '../../../components/Thead';
import Tr from '../../../components/Tr';
import Th from '../../../components/Th';
import Tbody from '../../../components/Tbody';
import Td from '../../../components/Td';
import Pagination from '../../../components/Pagination';
import Navigator from '../../../components/Navigator';
import Select from '../../../components/Select';
import { FaEdit, FaToggleOff, FaToggleOn, FaTrash } from 'react-icons/fa';


const initialForms = ({ id: 0, nome: '', ativo: true });

const CategoriaProduto = () => {
    const [categoriaProduto, setCategoriaProduto] = useState(initialForms);
    const [items, setItems] = useState([]);

    const getCategoriaProduto = () => {
        fetch("http://localhost:8080/api/categoriaproduto")
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.log("Erro ao consultar" + error))
    }

    useEffect(() => {
        getCategoriaProduto();
    });

    //Paginação
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const pages = Math.ceil(items.length / itemsPerPage);
    const startIndex = itemsPerPage * currentPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = (items.slice(startIndex, endIndex));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoriaProduto({ ...categoriaProduto, [name]: value });
    }
    const handleRadio = (e) => {
        const isSelected = e.target.value === "true" ? true : false;
        setCategoriaProduto({ ...categoriaProduto, ativo: isSelected });

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (categoriaProduto.id === 0) {
            fetch("http://localhost:8080/api/categoriaproduto", {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(categoriaProduto),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then((data) => {
                    if (data) {
                        getCategoriaProduto();
                    }
                })
        }
        else {
            const id = categoriaProduto.id;
            fetch(`http://localhost:8080/api/categoriaproduto/${id}`, {
                method: "PUT",
                mode: "cors",
                body: JSON.stringify(categoriaProduto),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then((data) => {
                    if (data) {
                        getCategoriaProduto();
                    }
                })

        }
        setCategoriaProduto(initialForms);

    }
    const handleUpdate = (id) => {
        fetch(`http://localhost:8080/api/categoriaproduto/${id}`)
            .then(response => response.json())
            .then(data => setCategoriaProduto(data))
            .catch(error => console.log("Erro ao consultar a categoria" + error))

    }
    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/categoriaproduto/${id}`, {
            method: "DELETE",
        })
            .then(response => response.json())
            .then((data) => {
                if (data) {
                    getCategoriaProduto();
                    setCategoriaProduto(initialForms)
                    setCurrentPage(0);
                }
            })

    }

    const handleCancel = (e) => {
        e.preventDefault();
        setCategoriaProduto(initialForms);
    }

    useEffect(()=>{
        setCurrentPage(0);
    }, [itemsPerPage])
    return (
        <>
            <Container>
                <Main>
                    <Titulo title="Cadastrar Categoria de Produto" />
                    <Form>
                        <FormGroup>
                            <Label name="Nome">
                                <Input type="text" name="nome" value={categoriaProduto.nome} placeholder="Informe o nome" onchange={handleChange} />
                            </Label>
                        </FormGroup>
                        <FormRadio>
                            <Label name="Ativo" />
                            <Input type="radio" name="ativo" value="true" valorSelecionado={categoriaProduto.ativo === true} onchange={handleRadio} /><Span name="Sim" />
                            <Input type="radio" name="ativo" value="false" valorSelecionado={categoriaProduto.ativo === false} onchange={handleRadio} /><Span name="Não" />
                        </FormRadio>
                        <Button name="Cadastrar" classe="botao cadastrar" onclick={handleSubmit} />
                        <Button name="Cancelar" classe="botao cancelar" onclick={handleCancel} />
                    </Form>
                </Main>
                <Main>
                    <Titulo title="Listar Categoria de Produto" />
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
                                <Th name="Nome" />
                                <Th name="Ativo" />
                                <Th name="Ações" />
                            </Tr>
                        </Thead>
                        <Tbody>
                            {currentItems.map((item, index) => (
                                <Tr key={index}>
                                    <Td>{item.nome}</Td>
                                    <Td>{item.ativo ? <FaToggleOn className='toggleOn'/> : <FaToggleOff className='toggleOff'/>}</Td>
                                    <Td>
                                        <FaEdit className="edit" onClick={() => handleUpdate(item.id)}/>
                                        <FaTrash className='delete' onClick={() => handleDelete(item.id)}/>
                                    </Td>
                                </Tr>
                            ))}

                        </Tbody>
                    </Table>
                    {pages > 1 && (
                        <Pagination>
                            {Array.from(Array(pages), (item, index) => {
                                return <Button classe={Number(index) === currentPage ? "botao btnPagination active" : "botao btnPagination"}
                                    key={index}
                                    name={Number(index) + 1}
                                    value={Number(index)} onclick={(e) => setCurrentPage(Number(e.target.value))} />

                            })}
                        </Pagination>
                    )}
                </Main>
            </Container>
        </>
    )
}
export default CategoriaProduto