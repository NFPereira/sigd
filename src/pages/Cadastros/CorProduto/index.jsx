import React, { useEffect, useState } from 'react'
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
import Navigator from '../../../components/Navigator';
import Select from '../../../components/Select';
import Pagination from '../../../components/Pagination';

const fetchData = async () => {
    const res = await fetch("http://localhost:8080/api/corproduto");
    return res.json();
}

const initialForms = ({ id: 0, nome: '', ativo: true });
const CorProduto = () => {
    const [corProduto, setCorProduto] = useState(initialForms)
    const [items, setItems] = useState([]);

    const getCorProduto = () => {
        fetch("http://localhost:8080/api/corproduto")
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.log("Erro ao consultar" + error));
    }

    useEffect(() => {
        getCorProduto();
    }, []);

    //PAGINAÇÃO
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const startIndex = itemsPerPage * currentPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);
    const pages = Math.ceil(items.length / itemsPerPage);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCorProduto({ ...corProduto, [name]: value });
    }

    const handleRadio = (e) => {
        const isSelected = e.target.value === "true" ? true : false;
        setCorProduto({ ...corProduto, ativo: isSelected });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (corProduto.id === 0) {
            const url = "http://localhost:8080/api/corproduto";
            fetch(url, {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(corProduto),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then((data) => {
                    if (data) {
                        getCorProduto();
                    }
                })

        } else {
            const id = corProduto.id;
            fetch(`http://localhost:8080/api/corproduto/${id}`, {
                method: "PUT",
                mode: "cors",
                body: JSON.stringify(corProduto),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then((data) => {
                    if (data) {
                        getCorProduto();
                    }
                })

        }
        setCorProduto(initialForms);
    }
    const handleUpdate = (id) => {
        const url = `http://localhost:8080/api/corproduto/${id}`;
        fetch(url)
            .then(response => response.json())
            .then(data => setCorProduto(data))
            .catch(error => console.log("Erro ao consultar " + error));

    }
    const handleDelete = (id) => {
        const url = `http://localhost:8080/api/corproduto/${id}`;
        fetch(url, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then((data) => {
                if (data) {
                    getCorProduto();
                    setCorProduto(initialForms);
                    setCurrentPage(0);
                }
            })
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setCorProduto(initialForms);
    }

    useEffect(() => {
        setCurrentPage(0);
    }, [itemsPerPage]);

    return (
        <>
            <Container>
                <Main>
                    <Titulo title="Cadastro de Cor Produto" />
                    <Form>
                        <FormGroup>
                            <Label name="Nome">
                                <Input type="text" name="nome" value={corProduto.nome} placeholder="Informe o nome" onchange={handleChange} />
                            </Label>
                        </FormGroup>
                        <FormRadio>
                            <Label name="Ativo" />
                            <Input type="radio" name="ativo" value="true" valorSelecionado={corProduto.ativo === true} onchange={handleRadio} /><Span name="Sim" />
                            <Input type="radio" name="ativo" value="false" valorSelecionado={corProduto.ativo === false} onchange={handleRadio} /><Span name="Não" />
                        </FormRadio>
                        <Button name="Cadastrar" classe="botao cadastrar" onclick={handleSubmit} />
                        <Button name="Cancelar" classe="botao cancelar" onclick={handleCancel} />
                    </Form>
                </Main>
                <Main>
                    <Titulo title="Lista de Cores Produto" />
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
                    <Table className="tabela">
                        <Thead>
                            <Tr>
                                <Th name="Nome" />
                                <Th name="Ativo" />
                                <Th name="Ações" />
                            </Tr>
                        </Thead>
                        <Tbody>
                            {currentItems.map((item) => (
                                <Tr key={item.id}>
                                    <Td>{item.nome}</Td>
                                    <Td>{item.ativo ? "Sim" : "Não"}</Td>
                                    <Td>
                                        <Button name="Editar" classe="botao editar" onclick={() => handleUpdate(item.id)} />
                                        <Button name="Excluir" classe="botao remover" onclick={() => handleDelete(item.id)} />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                    {pages > 1 && (
                    <Pagination>
                        {Array.from(Array(pages), (item, index)=>{
                            return <Button classe={Number(index) === currentPage ? "botao btnPagination active": "botao btnPagination"} name={Number(index)+1} value={Number(index)} onclick={(e)=> setCurrentPage(Number(e.target.value))}/>
                        })}
                    </Pagination>
                    )}
                </Main>
            </Container>
        </>

    )
}

export default CorProduto