import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import Titulo from '../../../components/Titulo';
import Container from '../../../components/Container';
import Main from '../../../components/Main';
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
import Td from '../../../components/Td';
import Th from '../../../components/Th';
import Tbody from '../../../components/Tbody';
import Pagination from '../../../components/Pagination';
import Navigator from '../../../components/Navigator';
import Select from '../../../components/Select';


const initialForm = ({ id: 0, codigo: '', nome: '', ativo: true });

const TipoPessoa = () => {
    const [tipoPessoa, setTipoPessoa] = useState(initialForm);
    const [items, setItems] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0)

    const getTipoPessoa = () => {
        fetch("http://localhost:8080/api/TipoPessoa/")
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.log("Erro ao consultar" + error))
    }

    useEffect(() => {
        getTipoPessoa()
    }, []);

    //Paginação
    const startIndex = itemsPerPage * currentPage;
    const endIndex = startIndex + itemsPerPage;
    const pages = Math.ceil(items.length / itemsPerPage);
    const currentItems = items.slice(startIndex, endIndex);

    const handleRadio = (e) => {
        const isSelected = e.target.value === "true" ? true : false;
        setTipoPessoa({ ...tipoPessoa, ativo: isSelected });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTipoPessoa({ ...tipoPessoa, [name]: value });
    }

    const handleUpdate = (id) => {
        const url = `http://localhost:8080/api/TipoPessoa/${id}`;

        fetch(url)
            .then(response => response.json())
            .then(data => setTipoPessoa(data));

    }

    const handleDelete = (id) => {
        const url = `http://localhost:8080/api/tipopessoa/${id}`;

        fetch(url, {
            method: "DELETE"
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data) {
                    getTipoPessoa();
                    setTipoPessoa(initialForm);
                    setCurrentPage(0);
                }
            })
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if (tipoPessoa.id === 0) {
            const url = `http://localhost:8080/api/TipoPessoa/`;

            fetch(url, {
                method: "POST",
                mode: 'cors',
                body: JSON.stringify(tipoPessoa),
                headers: {
                    "Content-Type": "application/json",
                    "Accepty": "application/json"
                }
            })
                .then(response => response.json())
                .then(data => getTipoPessoa())


        } else {

            const id = tipoPessoa.id;
            const url = `http://localhost:8080/api/TipoPessoa/${id}`;

            fetch(url, {
                method: "PUT",
                mode: 'cors',
                body: JSON.stringify(tipoPessoa),
                headers: {
                    "Content-Type": "application/json",
                    "Accepty": "application/json"
                }
            })
                .then(response => response.json())
                .then(data => getTipoPessoa())
        }
        setTipoPessoa(initialForm)
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setTipoPessoa(initialForm);
    }

    useEffect(() => {
        setCurrentPage(0)
    }, [itemsPerPage])

    return (
        <>
            <Container>
                <Main>
                    <Titulo title="Cadastro de tipo de pessoa" />
                    <Form>
                        <FormGroup>
                            <Label name="Código">
                                <Input type="text" name="codigo" value={tipoPessoa.codigo} placeholder="Informe o código" onchange={handleChange} />
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label name="Nome">
                                <Input type="text" name="nome" value={tipoPessoa.nome} placeholder="Informe o nome" onchange={handleChange} />
                            </Label>
                        </FormGroup>
                        <FormRadio>
                            <Label name="Ativo" />
                            <Input type="radio" name="ativo" value="true" valorSelecionado={tipoPessoa.ativo === true} onchange={handleRadio} /><Span name="Sim" />
                            <Input type="radio" name="ativo" value="false" valorSelecionado={tipoPessoa.ativo === false} onchange={handleRadio} /><Span name="Não" />
                        </FormRadio>
                        <Button name="Cadastrar" classe="botao cadastrar" onclick={handleSubmit} />
                        <Button name="Cancelar" classe="botao cancelar" onclick={handleCancel} />
                    </Form>
                </Main>
                <Main>
                    <Titulo title="Lista de tipos de pessoas" />
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
                                <Input type="text" name="seacrh" placeholder="Pesquisar" />
                            </Label>
                        </FormGroup>
                    </Navigator>
                    <Table classe='tabela'>
                        <Thead>
                            <Tr>
                                <Th name="Código" />
                                <Th name="Nome" />
                                <Th name="Ativo" />
                                <Th name="Ações" />
                            </Tr>
                        </Thead>
                        <Tbody>
                            {currentItems.map((item) => (
                                <Tr key={item.id}>
                                    <Td>{item.codigo}</Td>
                                    <Td>{item.nome}</Td>
                                    <Td>{item.ativo ? "Sim" : "Não"}</Td>
                                    <Td>
                                        <Button name="Editar" classe='botao editar' onclick={() => handleUpdate(item.id)}>Editar</Button>
                                        <Button name="Excluir" classe='botao remover' onclick={() => handleDelete(item.id)}>Excluir</Button>
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

export default TipoPessoa