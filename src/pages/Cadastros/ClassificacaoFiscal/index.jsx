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

const initialForms = ({ id: 0, nome: '', ativo: true })
const ClassificacaoFiscal = () => {
    const [classificacaoFiscal, setClassificacaoFiscal] = useState(initialForms);
    const [items, setItems] = useState([]);

    const getClassificacaoFiscal = () => {
        fetch("http://localhost:8080/api/classificacaofiscal")
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.log("Erro ao consultar" + error))
    }

    useEffect(() => {
        getClassificacaoFiscal();
    })

    //Paginação
    const[itemsPerPage, setItemsPerPage] = useState(5);
    const[currentPage, setCurrentPage] = useState(0);
    const startIndex = itemsPerPage * currentPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);
    const pages = Math.ceil(items.length / itemsPerPage)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClassificacaoFiscal({ ...classificacaoFiscal, [name]: value });
    }
    const handleRadio = (e) => {
        const isSelected = e.target.value === "true" ? true : false;
        setClassificacaoFiscal({ ...classificacaoFiscal, ativo: isSelected });

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (classificacaoFiscal.id === 0) {
            fetch("http://localhost:8080/api/classificacaoFiscal", {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(classificacaoFiscal),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then((data) => {
                    if (data) {
                        getClassificacaoFiscal();
                    }
                })
        }
        else {
            const id = classificacaoFiscal.id;
            fetch(`http://localhost:8080/api/classificacaofiscal/${id}`, {
                method: "PUT",
                mode: "cors",
                body: JSON.stringify(classificacaoFiscal),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then((data) => {
                    if (data) {
                        getClassificacaoFiscal();
                    }
                })

        }
        setClassificacaoFiscal(initialForms);

    }
    const handleUpdate = (id) => {

        fetch(`http://localhost:8080/api/classificacaofiscal/${id}`)
        .then(response => response.json())
        .then(data => setClassificacaoFiscal(data))
        .catch(error => console.log("Erro ao consultar a Grupo Produto" + error))
        
    }
    const handleDelete = (id) => {
        console.log(id)
        fetch(`http://localhost:8080/api/classificacaofiscal/${id}`, {
            method: "DELETE",
        })
            .then(response => response.json())
            .then((data) => {
                if (data) {
                    getClassificacaoFiscal();
                    setClassificacaoFiscal(initialForms)
                    setCurrentPage(0);
                }
            })
    }

    const handleCancel = (e)=>{
        e.preventDefault();
        setClassificacaoFiscal(initialForms);
    }

    useEffect(()=>{
        setCurrentPage(0);
    },[itemsPerPage])

    return (
        <>
            <Container>
                <Main>
                    <Titulo title="Cadastro Classificação Fiscal" />
                    <Form>
                        <FormGroup>
                            <Label name="Nome">
                                <Input type="text" name="nome" value={classificacaoFiscal.nome} placeholder="Informe o nome" onchange={handleChange} />
                            </Label>
                        </FormGroup>
                        <FormRadio>
                            <Label name="Ativo" />
                            <Input type="radio" name="ativo" value="true" valorSelecionado={classificacaoFiscal.ativo === true} onchange={handleRadio} /><Span name="Sim" />
                            <Input type="radio" name="ativo" value="false" valorSelecionado={classificacaoFiscal.ativo === false} onchange={handleRadio} /><Span name="Não" />
                        </FormRadio>
                        <Button name="Cadastrar" classe="botao cadastrar" onclick={handleSubmit} />
                        <Button name="Cancelar" classe="botao cancelar" onclick={handleCancel} />
                    </Form>
                </Main>
                <Main>
                    <Titulo title="Lista Classificação Fiscal" />
                    <Navigator>
                        <FormGroup>
                            <Label>
                                <Select value={itemsPerPage} onchange={(e)=>setItemsPerPage(Number(e.target.value))}>
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
                            {currentItems.map((item, index) => (
                                <Tr key={index}>
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
                            return <Button classe={Number(index)=== currentPage ? "botao btnPagination active":"botao btnPagination"} name={Number(index)+1} value={Number(index)} onclick={(e)=> setCurrentPage(Number(e.target.value))} />
                        })}
                    </Pagination>
                    )}
                </Main>
            </Container>
        </>
    )
}

export default ClassificacaoFiscal