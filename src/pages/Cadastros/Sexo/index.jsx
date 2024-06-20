import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import Titulo from '../../../components/Titulo';
import Container from '../../../components/Container';
import Main from '../../../components/Main';
import Navigator from '../../../components/Navigator';
import Table from '../../../components/Table';
import Thead from '../../../components/Thead';
import Tr from '../../../components/Tr';
import Tbody from '../../../components/Tbody';
import Td from '../../../components/Td';
import Th from '../../../components/Th';
import Button from '../../../components/Button';
import Form from '../../../components/Form';
import FormGroup from '../../../components/FormGroup';
import Label from '../../../components/Label';
import Input from '../../../components/Input';
import FormRadio from '../../../components/FormRadio';
import Span from '../../../components/Span';
import Pagination from '../../../components/Pagination';
import Select from '../../../components/Select';
import { FaEdit, FaToggleOff, FaToggleOn, FaTrash } from 'react-icons/fa';

const initialForms = ({ id: 0, nome: '', sigla: '', ativo: true });

const Sexo = () => {
    const [sexo, setSexo] = useState(initialForms);
    const [items, setItems] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);

    const getSexos = () => {
        fetch('http://localhost:8080/api/sexo/')
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.log("Erro ao consultar " + error))
    }

    useEffect(() => {
        getSexos();
    }, []);

    //Paginação
    const pages = Math.ceil(items.length / itemsPerPage);
    const startIndex = itemsPerPage * currentPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);


    const handleRadio = (e) => {
        const isSelected = e.target.value === "true" ? true : false;
        setSexo({ ...sexo, ativo: isSelected });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSexo({ ...sexo, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (sexo.id === 0) {
            const url = "http://localhost:8080/api/sexo/";

            fetch(url, {
                method: "POST",
                body: JSON.stringify(sexo),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(response => response.json())
                .then((data) => {
                    if (data) {
                        getSexos()
                    }
                })
                .catch(error => console.log('Erro ao inserir ' + error));
        }
        else {
            const id = sexo.id;
            const url = `http://localhost:8080/api/sexo/${id}`;
            fetch(url, {
                method: "PUT",
                body: JSON.stringify(sexo),
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then((data) => {
                    if (data) {
                        getSexos();
                        setSexo(initialForms)
                    }
                })


        }
        setSexo(initialForms);
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setSexo(initialForms);

    }

    const handleUpdate = (id) => {
        const url = `http://localhost:8080/api/sexo/${id}`;

        fetch(url)
            .then(response => response.json())
            .then(data => setSexo(data))
            .catch(error => console.log("Erro ao consultar " + error));
    }

    const handleDelete = (id) => {
        const url = `http://localhost:8080/api/sexo/${id}`;

        fetch(url, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then((data) => {
            if (data) {
                getSexos();
                setSexo(initialForms)
            }
        })
    }

    useEffect(()=>{
        setCurrentPage(0);
    },[itemsPerPage]);

    return (
        <>
            <Container>
                <Main>
                    <Titulo title="Cadstro de sexo" />
                    <Form>
                        <FormGroup>
                            <Label name="Nome">
                                <Input type="text" name="nome" value={sexo.nome} placeholder='Digite o nome' onchange={handleChange} />
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label name="Sigla">
                                <Input type="text" name="sigla" value={sexo.sigla} placeholder='Digite a sigla' onchange={handleChange} />
                            </Label>
                        </FormGroup>
                        <FormRadio>
                            <Label name="Ativo" />
                            <Input type="radio" name="ativo" value="true" valorSelecionado={sexo.ativo === true} onchange={handleRadio} /><Span name="Sim" />
                            <Input type="radio" name="ativo" value="false" valorSelecionado={sexo.ativo === false} onchange={handleRadio} /><Span name="Não" />
                        </FormRadio>
                        <Button name="Cadastrar" classe='botao cadastrar' onclick={handleSubmit} />
                        <Button name="Cancelar" classe='botao cancelar' onclick={handleCancel} />
                    </Form>
                </Main>
                <Main>
                    <Titulo title="Lista de sexos" />
                    <Navigator>
                        <FormGroup>
                            <Label>
                                <Select value={itemsPerPage} onchange={(e)=>setItemsPerPage(e.target.value)}>
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
                    <Table classe='tabela'>
                        <Thead>
                            <Tr>
                                <Th name="Nome" />
                                <Th name="Sigla" />
                                <Th name="Ativo" />
                                <Th name="Ações" />
                            </Tr>
                        </Thead>
                        <Tbody>
                            {currentItems.map((item) => (
                                <Tr key={item.id}>
                                    <Td>{item.nome}</Td>
                                    <Td>{item.sigla}</Td>
                                    <Td>{item.ativo ? <FaToggleOn className='toggleOn'/> : <FaToggleOff className='toggleOff'/>}</Td>
                                    <Td>
                                        <FaEdit className='edit'  onClick={() => handleUpdate(item.id)}/>
                                        <FaTrash className='delete' onClick={() => handleDelete(item.id)}/>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                    {pages > 1 && (
                        <Pagination>
                            {Array.from(Array(pages), (item, index) => {
                                return <Button classe={Number(index) === currentPage ? "botao btnPagination active" : "botao btnPagination"} key={index} value={Number(index)} name={Number(index) + 1} onclick={(e) => setCurrentPage(Number(e.target.value))} />
                            })}
                        </Pagination>
                    )}
                </Main>
            </Container>
        </>

    )
}
export default Sexo