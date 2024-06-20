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
import Pagination from '../../../components/Pagination';
import Navigator from '../../../components/Navigator';
import Select from  '../../../components/Select';
import { FaEdit, FaTrash } from 'react-icons/fa';

const initialForms = ({ id: 0, codigo: '', nome: '' });
const Natureza = () => {
    const [natureza, setNatureza] = useState(initialForms);
    const [items, setItems] = useState([]);

    const getNatureza = () => {
        fetch("http://localhost:8080/api/natureza/")
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.log("Erro ao consultar" + error))
    }

    useEffect(() => {
        getNatureza();
    }, []);

    //Pagination
    const[itemsPerPage, setItemsPerPage] = useState(5);
    const[currentPage, setCurrentPage] = useState(0);
    const startIndex = itemsPerPage * currentPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);
    const pages = Math.ceil(items.length / itemsPerPage);    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNatureza({ ...natureza, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (natureza.id === 0) {
            fetch("http://localhost:8080/api/natureza", {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(natureza),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then((data) => {
                    if (data) {
                        getNatureza();
                    }
                })
        }
        else {
            const id = natureza.id;
            fetch(`http://localhost:8080/api/natureza/${id}`, {
                method: "PUT",
                mode: "cors",
                body: JSON.stringify(natureza),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then((data) => {
                    if (data) {
                        getNatureza();
                    }
                })
        }
        setNatureza(initialForms);
    }

    const handleUpdate = (id) => {
        fetch(`http://localhost:8080/api/natureza/${id}`)
            .then(response => response.json())
            .then(data => setNatureza(data))
            .catch(error => console.log("Erro ao consultar " + error));
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/natureza/${id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then((data) => {
                if (data) {
                    getNatureza();
                    setNatureza(initialForms);
                    setCurrentPage(0);
                }
            })

    }

    const handleCancel = (e)=>{
        e.preventDefault();
        setNatureza(initialForms);
    }

    useEffect(()=>{
        setCurrentPage(0);
    },[itemsPerPage]);


    return (
        <>
            <Container>
                <Main>
                    <Titulo title="Cadastrar Natureza Operação" />
                    <Form>
                        <FormGroup>
                            <Label name="Código">
                                <Input type="text" name="codigo" value={natureza.codigo} placeholder="Informe o código" onchange={handleChange} />
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label name="Nome">
                                <Input type="text" name="nome" value={natureza.nome} placeholder="Informe o nome" onchange={handleChange} />
                            </Label>
                        </FormGroup>
                        <Button name="Cadastrar" classe="botao cadastrar" onclick={handleSubmit} />
                        <Button name="Cancelar" classe="botao cancelar" onclick={handleCancel} />
                    </Form>
                </Main>
                <Main>
                    <Titulo title="Listar Natureza Operação" />
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
                                <Th name="Código" />
                                <Th name="Nome" />
                                <Th name="Ações" />
                            </Tr>
                        </Thead>
                        <Tbody>
                            {currentItems.map((item) => (
                                <Tr key={item.id}>
                                    <Td>{item.codigo}</Td>
                                    <Td>{item.nome}</Td>
                                    <Td>
                                    <FaEdit className='edit' onClick={() => handleUpdate(item.id)}/>
                                    <FaTrash className='delete' onClick={() => handleDelete(item.id)}/>
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

export default Natureza