import React, { useEffect, useState } from 'react'

import styles from './styles.module.css'

import Titulo from '../../../components/Titulo';
import Container from '../../../components/Container';
import Main from '../../../components/Main';
import Form from '../../../components/Form';
import Table from '../../../components/Table';
import Thead from '../../../components/Thead';
import Tr from '../../../components/Tr';
import Th from '../../../components/Th';
import Tbody from '../../../components/Tbody';
import Td from '../../../components/Td';
import Button from '../../../components/Button';
import Label from '../../../components/Label';
import Input from '../../../components/Input';
import FormGroup from '../../../components/FormGroup';
import FormRadio from '../../../components/FormRadio';
import Span from '../../../components/Span';
import Select from '../../../components/Select';
import Navigator from '../../../components/Navigator';
import Pagination from '../../../components/Pagination';

//import icons
import { FaEdit, FaRegEdit, FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";

const initialForms = ({ id: 0, codigo: '', nome: '', sigla: '', idPais: 0, nomePais: "SELECIONE", ativo: true });

const Estados = () => {

  const [items, setItems] = useState([]);
  const [estados, setEstados] = useState(initialForms);
  const [paises, setPaises] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const getEstados = () => {
    fetch("http://localhost:8080/api/Estado/")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.log("Erro ao consultar" + error))
      .finally(
        console.log("consultar retornada")
      );
  }
  const getPaises = () => {
    fetch("http://localhost:8080/api/Pais/")
      .then((response) => response.json())
      .then((data) => setPaises(data))
      .catch((error) => console.log("Erro ao consultar" + error))
      .finally(
        console.log("consulta retornada")
      );
  }

  useEffect(() => {
    getEstados();
    getPaises();
  }, []);

  //Pagination
  const pages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage * itemsPerPage);
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);


  const handleRadio = (event) => {
    const isSelected = event.target.value === "true" ? true : false;
    setEstados({ ...estados, ativo: isSelected });
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEstados({ ...estados, [name]: value });
    console.log(estados);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (estados.id === 0) {

      const url = "http://localhost:8080/api/Estado";

      fetch(url, {
        method: "POST",
        body: JSON.stringify(estados),
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
        .then((response) => {
          return response.json
        })
        .then((data) => {
          if (data) {
            getEstados();
          }
        })
    }
    else {
      const id = estados.id;

      console.log(estados);

      fetch(`http://localhost:8080/api/Estado/${id}`, {
        method: "PUT",
        body: JSON.stringify(estados),
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
        .then((response) => {
          return response.json
        })
        .then((data) => {
          if (data) {
            getEstados();
          }
        })
    }
    setEstados(initialForms);
  }

  const handleUpdate = (id) => {

    const url = `http://localhost:8080/api/estado/${id}`;

    fetch(url)
      .then(response=>response.json())
      .then(data=>setEstados(data))
      .catch(error=>console.log("Erro ao consultar"+ error))
      .finally(console.log("consulta retornada"));
  };

  const handleDelete = (id) => {
    const url = `http://localhost:8080/api/estado/${id}`;

    fetch(url, {
      method: "DELETE"
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          getEstados();
          setEstados(initialForms);
          setCurrentPage(0);
        }
      })
  }

  const handleCancel = (e) => {
    e.preventDefault();
    setEstados(initialForms);
  }

  useEffect(() => {
    setCurrentPage(0);
  }, [itemsPerPage])


  return (
    <>
      <Container>
        <Main>
          <Titulo title="Cadastro Estados" />
          <Form>
            <FormGroup>
              <Label name="Código">
                <Input type="text" value={estados.codigo} name="codigo" placeholder="Informe o código" onchange={handleChange} />
              </Label>
              <Label name="Nome">
                <Input type="text" value={estados.nome} name="nome" placeholder="Informe o nome" onchange={handleChange} />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label name="UF">
                <Input type="text" value={estados.sigla} name="sigla" placeholder="Informe a sigla" onchange={handleChange} />
              </Label>
              <Label name="País">
                <Select name="idPais" onchange={handleChange} value={estados.idPais}>
                  <option value="">SELECIONE</option>
                  {paises.map((pais, index) => (
                    <option key={index} value={pais.id}>{pais.nome}</option>
                  ))}
                </Select>
              </Label>
            </FormGroup>
            <FormRadio>
              <Label name="Ativo" />
              <Input type="radio" name="ativo" value="true" valorSelecionado={estados.ativo == true} onchange={handleRadio} /><Span name="Sim" />
              <Input type="radio" name="ativo" value="false" valorSelecionado={estados.ativo === false} onchange={handleRadio} /><Span name="Não" />
            </FormRadio>
            <Button name="Cadastrar" classe="botao cadastrar" onclick={handleSubmit} />
            <Button name="Cancelar" classe="botao cancelar" onclick={handleCancel} />
          </Form>
        </Main>
        <Main>
          <Titulo title="Lista Estados" />
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

                <Tr key={index}>
                  <Td>{item.codigo}</Td>
                  <Td>{item.nome}</Td>
                  <Td>{item.sigla}</Td>
                  <Td>{item.ativo ? <FaToggleOn className='toggleOn'/> : <FaToggleOff className='toggleOff'/>}</Td>
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
              {Array.from(Array(pages), (item, index) => {
                return <Button classe={Number(index) === currentPage ? "botao btnPagination active" : "botao btnPagination"} key={index} value={Number(index)} name={Number(index) + 1} onclick={(e) => setCurrentPage(Number(e.target.value))} />

              })}
            </Pagination>
          )}
        </Main>
      </Container>
    </>
  )
};
export default Estados