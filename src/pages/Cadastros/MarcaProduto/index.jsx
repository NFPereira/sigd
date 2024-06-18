import React, { useState, useEffect } from 'react'
import Container from '../../../components/Container';
import Main from '../../../components/Main';
import Table from '../../../components/Table';
import Thead from '../../../components/Thead';
import Tr from '../../../components/Tr';
import Th from '../../../components/Th';
import Tbody from '../../../components/Tbody';
import Td from '../../../components/Td';
import Button from '../../../components/Button';
import Titulo from '../../../components/Titulo';
import Form from '../../../components/Form';
import FormGroup from '../../../components/FormGroup';
import Label from '../../../components/Label';
import Input from '../../../components/Input';
import FormRadio from '../../../components/FormRadio';
import Span from '../../../components/Span';
import Pagination from '../../../components/Pagination';
import Navigator from '../../../components/Navigator';
import Select from  '../../../components/Select';

const initialForms = ({ id: 0, nome: '', ativo: true });

const MarcaProduto = () => {
    const [marcaProduto, setMarcaProduto] = useState(initialForms);
    const [items, setItems] = useState([]);

    const getMarcaProduto = () => {
        fetch("http://localhost:8080/api/marcaproduto")
            .then(response => response.json())
            .then(data => setItems(data));
    }

    useEffect(() => {
        getMarcaProduto();
    }, []);

    //Pagination
    const[itemsPerPage, setItemsPerPage] = useState(5);
    const[currentPage, setCurrentPage] = useState(0);
    const startIndex = itemsPerPage * currentPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);
    const pages = Math.ceil(items.length / itemsPerPage);

    const handleRadio = (e) => {
        const isSelected = e.target.value === "true" ? true : false;
        setMarcaProduto({ ...marcaProduto, ativo: isSelected })
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMarcaProduto({ ...marcaProduto, [name]: value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (marcaProduto.id === 0) {
            fetch("http://localhost:8080/api/marcaproduto", {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(marcaProduto),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then((data) => {
                    if (data) {
                        getMarcaProduto();
                    }
                })
        }
        else {

            const id = marcaProduto.id;

            fetch(`http://localhost:8080/api/marcaproduto/${id}`, {
                method: "PUT",
                mode: "cors",
                body: JSON.stringify(marcaProduto),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then((data) => {
                    if (data) {
                        getMarcaProduto();
                    }
                })
        }
        setMarcaProduto(initialForms);
    }

    const handleUpdate = (id) => {
        const url = `http://localhost:8080/api/marcaproduto/${id}`;
        fetch(url)
            .then(response => response.json())
            .then(data => setMarcaProduto(data))
            .catch(error => console.log("Erro ao consultar " + error));

    }
    const handleDelete = (id) => {
        const url = `http://localhost:8080/api/marcaproduto/${id}`;
        fetch(url, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then((data) => {
                if (data) {
                    getMarcaProduto();
                    setMarcaProduto(initialForms);
                    setCurrentPage(0);
                }
            })
    }

    const handleCancel = (e)=>{
        e.preventDefault();
        setMarcaProduto(initialForms);
    }

    useEffect(()=>{
        setCurrentPage(0);
    },[itemsPerPage]);

    return (
        <>
            <Container>
                <Main>
                    <Titulo title="Cadastro de marca de produto" />
                    <Form>
                        <FormGroup>
                            <Label name="Nome">
                                <Input type="text" name="nome" value={marcaProduto.nome} placeholder="Informe o nome" onchange={handleChange} />
                            </Label>
                        </FormGroup>
                        <FormRadio>
                            <Label>Ativo</Label>
                            <Input type="radio" name="ativo" value="true" valorSelecionado={marcaProduto.ativo === true} onchange={handleRadio} /><Span name="Sim" />
                            <Input type="radio" name="ativo" value="false" valorSelecionado={marcaProduto.ativo === false} onchange={handleRadio} /><Span name="Não" />
                        </FormRadio>
                        <Button name="Cadastrar" classe="botao cadastrar" onclick={handleSubmit} />
                        <Button name="Cancelar" classe="botao cancelar" onclick={handleCancel} />
                    </Form>
                </Main>
                <Main>
                    <Titulo title="Lista Marcas de Produto" />
                    <Navigator>
                        <FormGroup>
                            <Label>
                                <Select value={itemsPerPage} onchange={(e)=> setItemsPerPage(Number(e.target.value))}>
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                </Select>
                            </Label>
                            <Label>
                                <Input type="text" name="pesquisar" placeholder="Pesquisar"/>
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
                                return <Button classe={Number(index) === currentPage ? "botao btnPagination active" : "botao btnPagination"} key={index} name={Number(index)+1} value={Number(index)} onclick={(e)=> setCurrentPage(Number(e.target.value))} />
                            })}
                        </Pagination>
                    )}
                </Main>
            </Container>
        </>
    )
}
export default MarcaProduto