import { useEffect, useState, useTransition } from 'react'
import styles from './styles.module.css'
import Titulo from '../../../components/Titulo';
import Form from '../../../components/Form';
import Button from '../../../components/Button';
import Container from '../../../components/Container';
import Main from '../../../components/Main';
import Table from '../../../components/Table';
import Thead from '../../../components/Thead';
import Th from '../../../components/Th';
import Tr from '../../../components/Tr';
import Tbody from '../../../components/Tbody';
import Td from '../../../components/Td';
import FormGroup from '../../../components/FormGroup';
import Label from '../../../components/Label';
import Input from '../../../components/Input';
import Span from '../../../components/Span';
import FormRadio from '../../../components/FormRadio';
import Navigator from '../../../components/Navigator';
import Select from '../../../components/Select';
import Pagination from '../../../components/Pagination';

const initialForms = ({ id: 0, codigo: '', nome: '', sigla: '', ativo: true })

const Paises = () => {
    const [items, setItems] = useState([]);
    const [pais, setPais] = useState(initialForms);

    const getPais = async () => {
        await fetch("http://localhost:8080/api/Pais/")
            .then((response) => { return response.json(); })
            .then((data) => setItems(data))
    }

    useEffect(() => {
        getPais();
    }, []);

    //Pagination
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(0);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);

    const pages = Math.ceil(items.length / itemsPerPage);



    const handleRadio = (e) => {
        const isSelected = e.target.value === 'true' ? true : false;
        setPais({ ...pais, ativo: isSelected });
    }

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setPais({ ...pais, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (pais.id === 0) {

            const url = "http://localhost:8080/api/Pais/";
            fetch(url, {
                method: "POST",
                body: JSON.stringify(pais),
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            })
                .then(response => response.json())
                .then((data) => {
                    if (data) {
                        getPais();
                    }
                })
                .catch((error) => console.log("Erro ao cadastrar" + error));
        }
        else {
            const id = pais.id;
            const url = `http://localhost:8080/api/Pais/${id}`;

            fetch(url, {
                method: "PUT",
                body: JSON.stringify(pais, id),
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            })
                .then(response => response.json())
                .then((data) => {
                    if (data) {
                        getPais();
                    }
                })
                .catch((error) => console.log("Erro ao cadastrar" + error));
        }
        setPais(initialForms);

    }

    const handleEdit = (id) => {
        const url = `http://localhost:8080/api/Pais/${id}`;

        fetch(url)
            .then((response) => {
                return response.json()
            })
            .then(data => setPais(data));
    }

    const handleDelete = (id) => {
        const url = `http://localhost:8080/api/Pais/${id}`;

        fetch(url, {
            method: "DELETE"
        }).then((response) => {
            return response.json();

        })
            .then((data) => {
                if (data) {
                    getPais();
                    setPais(initialForms);
                    setCurrentPage(0);
                }
            })
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setPais(initialForms);
    }

    useEffect(()=>{
         setCurrentPage(0)
    },[itemsPerPage])
    
    return (
        <>
            <Container>
                <Main>
                    <Titulo title="Cadastros de país" />
                    <Form>
                        <FormGroup>
                            <Label name="Código">
                                <Input type="text" value={pais.codigo} name="codigo" placeholder="Informe o código" onchange={handleChange} />
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label name="Nome">
                                <Input type="text" value={pais.nome} name="nome" placeholder="Informe o nome" onchange={handleChange} />
                            </Label>
                            <Label name="Sigla">
                                <Input type="text" value={pais.sigla} name="sigla" placeholder="Informe a sigla" onchange={handleChange} />
                            </Label>
                        </FormGroup>
                        <FormRadio>
                            <Label name="Ativo" />
                            <Input type="radio" name="ativo" value="true" valorSelecionado={pais.ativo === true} onchange={handleRadio} /><Span name="Sim" />
                            <Input type="radio" name="ativo" value="false" valorSelecionado={pais.ativo === false} onchange={handleRadio} /><Span name="Não" />
                        </FormRadio>
                        <Button name="Cadastrar" classe="botao cadastrar" onclick={handleSubmit} />
                        <Button name="Cancelar" classe="botao cancelar" onclick={handleCancel} />
                    </Form>
                </Main>
                <Main>
                    <Titulo title="Lista de paises" />
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
                    <Table>
                        <Thead>
                            <Tr>
                                <Th name="Código" />
                                <Th name="Nome" />
                                <Th name="Sigla" />
                                <Th name="Ativo" />
                                <Th name="Ações" />
                            </Tr>
                        </Thead>
                        <Tbody>
                            {currentItems.map((item, index) => (
                                <Tr key={item.id}>
                                    <Td>{item.codigo}</Td>
                                    <Td>{item.nome}</Td>
                                    <Td>{item.sigla}</Td>
                                    <Td>{item.ativo ? "SIM" : "NÃO"}</Td>
                                    <Td>
                                        <Button id="btn-editar" name="Editar" onclick={() => handleEdit(item.id)} classe="botao editar" />
                                        <Button id="btn-excluir" name="Excluir" onclick={() => handleDelete(item.id)} classe="botao remover" />
                                    </Td>
                                </Tr>

                            ))}
                        </Tbody>
                    </Table>
                    {pages  > 1 &&(
                    <Pagination>
                        {Array.from(Array(pages), (item, index) => {
                            return <Button classe={Number(index) === currentPage ? 'botao btnPagination active' : 'botao btnPagination'} key={index} value={Number(index)} name={index + 1} onclick={(e) => setCurrentPage(Number(e.target.value))} />
                        })}
                    </Pagination>
                    )}
                </Main>
            </Container>
        </>
    )
}

export default Paises