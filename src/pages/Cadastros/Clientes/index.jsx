import { use, Suspense, useState, useEffect } from 'react';
import styles from './styles.module.css';
import Container from '../../../components/Container';
import Titulo from '../../../components/Titulo';
import Form from '../../../components/Form';
import FormGroup from '../../../components/FormGroup';
import Label from '../../../components/Label';
import Main from '../../../components/Main';
import Select from '../../../components/Select';
import Input from '../../../components/Input';
import FormRadio from '../../../components/FormRadio';
import Span from '../../../components/Span';
import Button from '../../../components/Button';
import Table from '../../../components/Table';
import Th from '../../../components/Th';
import Thead from '../../../components/Thead';
import Tr from '../../../components/Tr';
import Tbody from '../../../components/Tbody';
import Td from '../../../components/Td';
import Navigator from '../../../components/Navigator';
import Pagination from '../../../components/Pagination';

const data = new Date();
var mes = ("0" + (data.getMonth() + 1)).slice(-2);
const dataAtual = data.getFullYear() + '-' + mes + '-' + data.getDate();

const initialForms = ({ id: 0, idTipoPessoa: 0, nome: '', razaoSocial: '', idSexo: 0, dataNascimento: '', cnpjCpf: '', rgInscricaoEstadual: '', idEstado: 0, idCidade: 0, logradouro: '', numero: '', cep: '', bairro: '', complemento: '', telefone: '', celular: '', email: '', dataCadastro: dataAtual, ativo: true });
const Clientes = () => {

  const [tiposPessoas, setTiposPessoas] = useState([]);
  const [sexos, setSexos] = useState([]);
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [clientes, setClientes] = useState(initialForms)
  const [items, setItems] = useState([]);
  const [selectedEstado, setSelectedEstado] = useState('');

  const getTipoPessoa = () => {
    const url = 'http://localhost:8080/api/TipoPessoa';
    fetch(url)
      .then(response => response.json())
      .then(data => setTiposPessoas(data))
      .catch(error => console.log("Erro ao consultar o tipo de pessoa" + error))

  }

  const getSexo = () => {
    const url = 'http://localhost:8080/api/sexo';
    fetch(url)
      .then(response => response.json())
      .then(data => setSexos(data))
      .catch(error => console.log("Erro ao consultar os sexos" + error))
  }

  const getEstado = () => {
    const url = "http://localhost:8080/api/estado";
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data) {
          setEstados(data);
        }
      })
      .catch(error => console.log("Erro ao consultar os estados" + error))
  }

  const getCidade = () => {
    const id = selectedEstado ? selectedEstado : 1
    const urlCidades = `http://localhost:8080/api/Cidade/`;
    fetch(urlCidades)
      .then(response => response.json())
      .then(data => setCidades(data))
      .catch(error => console.log("Erro ao consultar as cidades" + error))
  }

  const getClientes = () => {
    const url = "http://localhost:8080/api/Cliente";

    fetch(url)
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.log("Erro ao consultar os clientes" + error))

  }

  useEffect(() => {
    getTipoPessoa();
    getSexo();
    getEstado();
    getClientes();
    getCidade();

  }, [])

  //Paginação
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const startIndex = itemsPerPage * currentPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);
  const pages = Math.ceil(items.length / itemsPerPage);

  const handleRadio = (e) => {
    const isSelected = e.target.value === "true" ? true : false;
    setClientes({ ...clientes, ativo: isSelected });
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientes({ ...clientes, [name]: value });

    if (name === "idEstado") {
      setSelectedEstado(value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (clientes.id === 0) {
      const url = `http://localhost:8080/api/cliente/`;

      fetch(url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(clientes),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
        .then(response => response.json())
        .then((data) => {
          if (data) {
            getClientes();
          }
        })
        .catch((error => console.log("Erro ao cadastrar " + error)))
    } else {
      const id = clientes.id
      fetch(`http://localhost:8080/api/cliente/${id}`, {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(clientes),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
        .then(response => response.json())
        .then((data) => {
          if (data) {
            getClientes();
          }
        })
        .catch((error => console.log("Erro ao cadastrar " + error)));
    }
    setClientes(initialForms);
  }

  const handleCancel = (e) => {
    e.preventDefault();
    setClientes(initialForms);
  }

  const handleUpdate = (id) => {
    fetch(`http://localhost:8080/api/cliente/${id}`)
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.log("Erro ao consultar " + error));
  }

  useEffect(()=>{
    getClientes();
  },[clientes]);

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/cliente/${id}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then((data) => {
        if (data) {
          getClientes();
          setClientes(initialForms);
        }
      })
  }

  useEffect(() => {
    setCurrentPage(0);
  }, [itemsPerPage])




  return (
    <>
      <Container>
        <Main>
          <Titulo title="Cadastro de cliente" />
          <Form>
            <FormGroup>
              <Label name="Tipo Pessoa">
                <Select disabled={clientes.id > 0 ? true : false} name="idTipoPessoa" value={clientes.idTipoPessoa} onchange={handleChange}>
                  <option value={0}>SELECIONE</option>
                  {tiposPessoas.map((tipoPessoa, index) => (
                    <option key={index} value={tipoPessoa.id}>{tipoPessoa.nome}</option>
                  ))}
                </Select>
              </Label>
              <Label name="Nome">
                <Input type="text" name="nome" value={clientes.nome} onchange={handleChange} placeholder="Informe o nome" />
              </Label>
              {Number(clientes.idTipoPessoa) === 2 && (
                <Label name="RazaoSocial">
                  <Input type="text" name="razaoSocial" value={clientes.razaoSocial} onchange={handleChange} placeholder="Informe a razão social" />
                </Label>
              )}
            </FormGroup>
            {Number(clientes.idTipoPessoa) === 1 && (
              <FormGroup>
                <Label name="Sexo">
                  <Select name="idSexo" value={clientes.idSexo} onchange={handleChange}>
                    <option value="">SELECIONE</option>
                    {sexos.map((sexo, index) => (
                      <option key={index} value={sexo.id}>{sexo.nome}</option>
                    ))}
                  </Select>
                </Label>
                <Label name="Data Nascimento">
                  <Input type="date" name="dataNascimento" value={new Date(clientes.dataNascimento).toLocaleDateString('fr-CA')} onchange={handleChange} placeholder="__/__/_____" />
                </Label>
              </FormGroup>
            )}
            <FormGroup>
              <Label name="CNPJ/CPF">
                <Input disabled={clientes.id > 0 ? true : false} type="text" name="cnpjCpf" value={clientes.cnpjCpf} onchange={handleChange} placeholder="Informe o CNPJ/CPF" />
              </Label>
              <Label name="RG/Inscrição Estadual">
                <Input type="text" name="rgInscricaoEstadual" value={clientes.rgInscricaoEstadual} onchange={handleChange} placeholder="Informe o RG/Inscrição Estadual" />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label name="Estados">
                <Select name="idEstado" value={clientes.idEstado} onchange={handleChange}>
                  <option value={0}>SELECIONE</option>
                  {estados.map((estado, index) => (
                    <option key={index} value={estado.id}>{estado.nome}</option>
                  ))}
                </Select>
              </Label>
                <Label name="Cidades">
                  <Select disabled={clientes.idEstado == 0} name="idCidade" value={clientes.idCidade} onchange={handleChange}>
                    <option value={0}>SELECIONE</option>
                    {cidades.length > 0 && cidades.map((cidade, index) => (
                      <option key={index} value={cidade.id}>{cidade.nome}</option>
                    ))}
                  </Select>
                </Label>
            </FormGroup>
            <FormGroup>
              <Label name="Logradouro">
                <Input type="text" name="logradouro" value={clientes.logradouro} onchange={handleChange} placeholder="Informe o endereço" />
              </Label>
              <Label name="Número">
                <Input type="text" name="numero" value={clientes.numero} onchange={handleChange} placeholder="Informe o número" />
              </Label>
              <Label name="CEP">
                <Input type="text" name="cep" value={clientes.cep} onchange={handleChange} placeholder="Informe o CEP" />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label name="Bairro">
                <Input type="text" name="bairro" value={clientes.bairro} onchange={handleChange} placeholder="Informe o bairro" />
              </Label>
              <Label name="Complemento">
                <Input type="text" name="complemento" value={clientes.complemento} onchange={handleChange} placeholder="Informe o complemento" />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label name="Telefone">
                <Input type="text" name="telefone" value={clientes.telefone} onchange={handleChange} placeholder="Informe o telefone" />
              </Label>
              <Label name="Celular">
                <Input type="text" name="celular" value={clientes.celular} onchange={handleChange} placeholder="Informe o celular" />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label name="E-mail">
                <Input type="text" name="email" value={clientes.email} onchange={handleChange} placeholder="Informe o email" />
              </Label>
            </FormGroup>
            <FormGroup>
                <Input type="hidden" name="dataCadastro" value={new Date(clientes.dataCadastro).toLocaleDateString('fr-CA')} onchange={handleChange} placeholder="informe a data de cadastro" />
            </FormGroup>

            <FormRadio>
              <Label name="Ativo" />
              <Input type="radio" name="ativo" value="true" valorSelecionado={clientes.ativo === true} onchange={handleRadio} /><Span name="Sim" />
              <Input type="radio" name="ativo" value="false" valorSelecionado={clientes.ativo === false} onchange={handleRadio} /><Span name="Não" />
            </FormRadio>
            <Button name="Cadastrar" classe="botao cadastrar" onclick={handleSubmit} />
            <Button name="Cancelar" classe="botao cancelar" onclick={handleCancel} />
          </Form>
        </Main>

        <Main>
          <Titulo title="Listas de Clientes" />
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
                <Th name="Nascimento" />
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
                  <Td>{new Date(item.dataNascimento).toLocaleDateString('pt-BR')}</Td>
                  <Td>{Number(item.idTipoPessoa) === 1 ? "CPF: ": "CNPJ: "}{item.cnpjCpf}</Td>
                  <Td>{item.rgInscricaoEstadual}</Td>
                  <Td>{item.ativo ? "Sim" : "Não"}</Td>
                  <Td>
                    <Button name="Editar" onclick={() => handleUpdate(item.id)} classe="botao editar" />
                    <Button name="Excluir" onclick={() => handleDelete(item.id)} classe="botao remover" />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          {pages > 1 && (
            <Pagination>
              {Array.from(Array(pages), (item, index) => {
                return <Button classe={Number(index) === currentPage ? "botao btnPagination active" : "botao btnPagination"} key={index} name={Number(index) + 1} value={Number(index)} onclick={(e) => setCurrentPage(Number(e.target.value))} />
              })}
            </Pagination>
          )}
        </Main>
      </Container >
    </>
  )
}

export default Clientes