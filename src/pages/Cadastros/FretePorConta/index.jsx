import React, { use, Suspense, useState, useEffect } from 'react'
import styles from './styles.module.css'
import Titulo from '../../../components/Titulo';
import Container from '../../../components/Container';
import Main from '../../../components/Main';
import Form from '../../../components/Form';
import Table from '../../../components/Table';
import FormGroup from '../../../components/FormGroup';
import Label from '../../../components/Label';
import Input from '../../../components/Input';
import FormRadio from '../../../components/FormRadio';
import Span from '../../../components/Span';
import Thead from '../../../components/Thead';
import Tr from '../../../components/Tr';
import Th from '../../../components/Th';
import Tbody from '../../../components/Tbody';
import Td from '../../../components/Td';
import Button from '../../../components/Button';
import Pagination from '../../../components/Pagination';

const initialForms = ({ id: 0, codigo: '', nome: '', ativo: true });
const FretePorContaItem = () => {
    const [fretePorConta, setFretePorConta] = useState(initialForms);
    const [items, setItems] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);

    const getFretePorConta = () => {
        fetch("http://localhost:8080/api/FretePorConta")
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.log("Erro ao consultar " + error));
    }

    useEffect(() => {
        getFretePorConta();
    }, []);

    const pages = Math.ceil(items.length / itemsPerPage);
    const startIndex = itemsPerPage * currentPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);

    const handleRadio = (e) => {
        const isSelected = e.target.value === "true" ? true : false;
        console.log(isSelected)
        setFretePorConta({ ...fretePorConta, ativo: isSelected });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFretePorConta({ ...fretePorConta, [name]: value });
    }

    const handleSubmit = (e) => {
        console.log(fretePorConta)
        e.preventDefault();
        if (fretePorConta.id === 0) {
            const url = "http://localhost:8080/api/FretePorConta/";
            fetch(url, {
                method: "POST",
                mode: 'cors',
                body: JSON.stringify(fretePorConta),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(response => response.json())
                .then((data) => {
                    if (data) {
                        getFretePorConta();
                    }
                })

        }
        else {
            const id = fretePorConta.id;
            const url = `http://localhost:8080/api/FretePorConta/${id}`;
            fetch(url, {
                method: "PUT",
                mode: "cors",
                body: JSON.stringify(fretePorConta),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then((data) => {
                    if (data) {
                        getFretePorConta();
                    }
                })

        }
        setFretePorConta(initialForms);

    }

    const handleCancel = (e) => {
        e.preventDefault();
        setFretePorConta(initialForms);

    }
    const handleUpdate = (id) => {
        const url = `http://localhost:8080/api/FretePorConta/${id}`;

        fetch(url)
            .then(response => response.json())
            .then((data) => {
                setFretePorConta(data);
            })
            .catch(error => console.log("Erro ao consultar " + error))

            console.log(url)

    }

    const handleDelete = (id) => {
        const url = `http://localhost:8080/api/FretePorConta/${id}`;

        fetch(url, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then((data) => {
                if (data) {
                    getFretePorConta();
                    setFretePorConta(initialForms);
                }
            })
    }

    useEffect(()=>{
        setCurrentPage(0);
    }, [itemsPerPage]);

    return (
        <>
            <Container>
                <Main>
                    <Titulo title="Cadastro frete por conta" />
                    <Form>
                        <FormGroup>
                            <Label name="Código">
                                <Input type="text" name="codigo" value={fretePorConta.codigo} placeholder="Informe o código" onchange={handleChange} />
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label name="Nome">
                                <Input type="text" name="nome" value={fretePorConta.nome} placeholder="Informe o nome" onchange={handleChange} />
                            </Label>
                        </FormGroup>
                        <FormRadio>
                            <Label name="Ativo" />
                            <Input type="radio" name="ativo" value="true" valorSelecionado={fretePorConta.ativo === true} onchange={handleRadio} /><Span name="Sim" />
                            <Input type="radio" name="ativo" value="false" valorSelecionado={fretePorConta.ativo === false} onchange={handleRadio} /><Span name="Não" />
                        </FormRadio>
                        <Button name="Cadastrar" classe="botao cadastrar" onclick={handleSubmit} />
                        <Button name="Cancelar" classe="botao cancelar" onclick={handleCancel} />
                    </Form>
                </Main>
                <Main>
                    <Titulo title="Lista fretes por conta" />
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
                            {currentItems.map((item, index) => (
                                <Tr key={index}>
                                    <Td>{item.codigo}</Td>
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
                            return <Button classe={Number(index) === currentPage ? "botao btnPagination active" : "botao btnPagination"} key={index} name={Number(index)+ 1} value={Number(index)} onclick={(e)=> setCurrentPage(Number(e.target.value))} />
                        })}
                    </Pagination>
                    )}
                </Main>
            </Container>
        </>
    )
}

const FretePorConta = () => {
    return (
        <Suspense>
            <FretePorContaItem />
        </Suspense>
    )

}

export default FretePorConta