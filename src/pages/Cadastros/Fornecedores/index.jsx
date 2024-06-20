import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'
import Container from '../../../components/Container'
import Main from '../../../components/Main'
import Titulo from '../../../components/Titulo'
import Form from '../../../components/Form'
import FormGroup from '../../../components/FormGroup'
import Label from '../../../components/Label'
import Select from '../../../components/Select'
import Input from '../../../components/Input'
import FormRadio from '../../../components/FormRadio'
import Button from '../../../components/Button'
import Span from '../../../components/Span'
import Navigator from '../../../components/Navigator'
import Table from '../../../components/Table'
import Thead from '../../../components/Thead'
import Tr from '../../../components/Tr'
import Th from '../../../components/Th'
import Tbody from '../../../components/Tbody'
import Td from '../../../components/Td'
import Pagination from '../../../components/Pagination'
import { FaEdit, FaToggleOff, FaToggleOn, FaTrash } from 'react-icons/fa'

const data = new Date();
var mes = ("0" + (data.getMonth() + 1)).slice(-2);
const dataAtual = data.getFullYear() + '-' + mes + '-' + data.getDate();

const initialForms = ({ id: 0, idTipoPessoa: 0, nome: '', razaoSocial: '', idSexo: 0, dataNascimento: '', cnpjCpf: '', rgInscricaoEstadual: '', idEstado: 0, idCidade: 0, logradouro: '', numero: '', cep: '', bairro: '', complemento: '', telefone: '', celular: '', fax: '', email: '', site: '', dataCadastro: dataAtual, ativo: true })
const Fornecedores = () => {
    const [fornecedor, setFornecedor] = useState(initialForms);
    const [items, setItems] = useState([]);
    const [tipoPessoa, setTipoPessoa] = useState([]);
    const [sexos, setSexos] = useState([])
    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);

    const getFornecedor = () => {
        fetch("http://localhost:8080/api/fornecedor")
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.log("Erro ao consultar os fornecedores " + error));
    }


    const getTipoPessoa = () => {
        fetch("http://localhost:8080/api/tipopessoa")
            .then(response => response.json())
            .then(data => setTipoPessoa(data))
            .catch(error => console.log("Erro ao consultar o tipo de pessoa " + error));
    }

    const getSexo = () => {
        fetch("http://localhost:8080/api/sexo")
            .then(response => response.json())
            .then(data => setSexos(data))
            .catch(error => console.log("Erro ao consultar o tipo de pessoa " + error));
    }

    const getEstado = () => {
        fetch("http://localhost:8080/api/estado")
            .then(response => response.json())
            .then(data => setEstados(data))
            .catch(error => console.log("Erro ao consultar o tipo de pessoa " + error));
    }

    const getCidade = () => {
        fetch("http://localhost:8080/api/cidade")
            .then(response => response.json())
            .then(data => setCidades(data))
            .catch(error => console.log("Erro ao consultar o tipo de pessoa " + error));
    }

    useEffect(() => {
        getFornecedor();
        getTipoPessoa();
        getSexo();
        getEstado();
        getCidade();
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
        setFornecedor({ ...fornecedor, [name]: value });
    }
    const handleRadio = (e) => {
        const isSelected = e.target.value === "true" ? true : false;
        setFornecedor({ ...fornecedor, ativo: isSelected });
    }

    const handleUpdate = (id) => {
        var url = `http://localhost:8080/api/fornecedor/${id}`;
        fetch(url)
            .then(response => response.json())
            .then(data => setFornecedor(data))
            .catch(error => console.log("Erro ao consultar o fornecedor" + error));

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (fornecedor.id === 0) {
            fetch("http://localhost:8080/api/fornecedor", {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(fornecedor),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then((data) => {
                    if (data) {
                        getFornecedor();
                    }
                })
        } else {

            console.log(fornecedor);
            const id = fornecedor.id;
            fetch(`http://localhost:8080/api/fornecedor/${id}`, {
                method: "PUT",
                mode: "cors",
                body: JSON.stringify(fornecedor),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        getFornecedor();
                    }
                })
        }
        setFornecedor(initialForms);
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setFornecedor(initialForms);
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/fornecedor/${id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then((data) => {
                if (data) {
                    getFornecedor();
                    setFornecedor(initialForms);
                    setCurrentPage(0)
                }
            })
    }

    useEffect(() => {
        setCurrentPage(0)
    }, [itemsPerPage]);

    return (
        <>
            <Container>
                <Main>
                    <Titulo title="Cadastrar Fornecedor" />
                    <Form>
                        <FormGroup>
                            <Label name="Tipo Pessoa">
                                <Select disabled={Number(fornecedor.id) > 0 ? true : false} name="idTipoPessoa" value={fornecedor.idTipoPessoa} onchange={handleChange}>
                                    <option value={0}>SELECIONE</option>
                                    {tipoPessoa.map((tipoPesoa, index) => (
                                        <option key={index} value={tipoPesoa.id}>{tipoPesoa.nome}</option>
                                    ))}
                                </Select>
                            </Label>
                            <Label name="Nome">
                                <Input type="text" name="nome" value={fornecedor.nome} placeholder="Informe o nome" onchange={handleChange} />
                            </Label>
                            {Number(fornecedor.idTipoPessoa) === 2 && (
                                <Label name="Razão Social">
                                    <Input type="text" name="razaoSocial" value={fornecedor.razaoSocial} placeholder="Informe a razão social" onchange={handleChange} />
                                </Label>
                            )}
                        </FormGroup>
                        <FormGroup>
                            <Label name="Sexo">
                                <Select name="idSexo" value={fornecedor.idSexo} onchange={handleChange}>
                                    <option value={0}>SELECIONE</option>
                                    {sexos.map((sexo, index) => (
                                        <option key={index} value={sexo.id}>{sexo.nome}</option>
                                    ))}
                                </Select>
                            </Label>
                            <Label name="Data Nascimento">
                                <Input type="date" name="dataNascimento" value={fornecedor.dataNascimento} onchange={handleChange} />
                            </Label>
                            <Label name="CNPJ/CPF">
                                <Input type="text" name="cnpjCpf" disabled={Number(fornecedor.id) > 0 ? true : false} value={fornecedor.cnpjCpf} placeholder="Informe o CNPJ/CPF" onchange={handleChange} />
                            </Label>
                            <Label name="RG/I.E">
                                <Input type="text" name="rgInscricaoEstadual" value={fornecedor.rgInscricaoEstadual} placeholder="Informe o rg/inscrição estadual" onchange={handleChange} />
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label name="Estado">
                                <Select name="idEstado" value={fornecedor.idEstado} onchange={handleChange}>
                                    <option value={0}>SELECIONE</option>
                                    {estados.map((estado, index) => (
                                        <option key={index} value={estado.id}>{estado.nome}</option>
                                    ))}
                                </Select>
                            </Label>
                            <Label name="Cidade">
                                <Select disabled={Number(fornecedor.idEstado) === 0 ? true : false} name="idCidade" value={fornecedor.idCidade} onchange={handleChange}>
                                    <option value={0}>SELECIONE</option>
                                    {cidades.map((cidade, index) => (
                                        <option key={index} value={cidade.id}>{cidade.nome}</option>
                                    ))}
                                </Select>
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label name="Logradouro">
                                <Input type="text" name="logradouro" value={fornecedor.logradouro} placeholder="Informe o endereço" onchange={handleChange} />
                            </Label>
                            <Label name="Número">
                                <Input type="text" name="numero" value={fornecedor.numero} placeholder="Informe o número" onchange={handleChange} />
                            </Label>
                            <Label name="CEP">
                                <Input type="text" name="cep" value={fornecedor.cep} placeholder="Informe o CEP" onchange={handleChange} />
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label name="Bairro">
                                <Input type="text" name="bairro" value={fornecedor.bairro} placeholder="Informe o bairro" onchange={handleChange} />
                            </Label>
                            <Label name="Complemento">
                                <Input type="text" name="complemento" value={fornecedor.complemento} placeholder="Informe o complemento" onchange={handleChange} />
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label name="Telefone">
                                <Input type="text" name="telefone" value={fornecedor.telefone} placeholder="Informe o telefone" onchange={handleChange} />
                            </Label>
                            <Label name="Celular">
                                <Input type="text" name="celular" value={fornecedor.celular} placeholder="Informe o celular" onchange={handleChange} />
                            </Label>
                            <Label name="Fax">
                                <Input type="text" name="fax" value={fornecedor.fax} placeholder="Informe o fax" onchange={handleChange} />
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label name="E-mail">
                                <Input type="text" name="email" value={fornecedor.email} placeholder="Informe o email" onchange={handleChange} />
                            </Label>
                            <Label name="Site">
                                <Input type="text" name="site" value={fornecedor.site} placeholder="Informe o site" onchange={handleChange} />
                            </Label>
                        </FormGroup>
                        <FormRadio>
                            <Label name="Ativo" />
                            <Input type="radio" name="ativo" value="true" valorSelecionado={fornecedor.ativo === true} onchange={handleRadio} /><Span name="Sim" />
                            <Input type="radio" name="ativo" value="false" valorSelecionado={fornecedor.ativo === false} onchange={handleRadio} /><Span name="Não" />
                        </FormRadio>
                        <FormGroup>
                            <Input type="hidden" name="dataCadastro" value={new Date(fornecedor.dataCadastro).toLocaleDateString('fr-CA')} />
                        </FormGroup>
                        <Button name="Cadastrar" classe="botao cadastrar" onclick={handleSubmit} />
                        <Button name="Cancelar" classe="botao cancelar" onclick={handleCancel} />
                    </Form>
                </Main>
                <Main>
                    <Titulo title="Listar Fornecedor" />
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
                    <Table>
                        <Thead>
                            <Tr>
                                <Th name="Nome" />
                                <Th name="CNPJ/CPF" />
                                <Th name="RG/I.E" />
                                <Th name="Ativo" />
                                <Th name="Ações" />

                            </Tr>
                        </Thead>
                        <Tbody>
                            {currentItems.map((item, index) => (
                                <Tr key={index}>
                                    <Td>{item.nome}</Td>
                                    <Td>{item.cnpjCpf}</Td>
                                    <Td>{item.rgInscricaoEstadual}</Td>
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
                                return <Button classe={Number(index) === currentPage ? "botao btnPagination active" : "botao btnPagination"} name={Number(index) + 1} value={Number(index)} key={index} onclick={(e) => setCurrentPage(Number(e.target.value))} />
                            })}
                        </Pagination>
                    )}
                </Main>
            </Container>
        </>
    )
}

export default Fornecedores