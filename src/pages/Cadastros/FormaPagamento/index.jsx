import React, { use, Suspense, useState, useEffect } from 'react'
import Titulo from '../../../components/Titulo';

import styles from './styles.module.css'
import Container from '../../../components/Container';
import Main from '../../../components/Main';
import Form from '../../../components/Form';
import FormGroup from '../../../components/FormGroup';
import Label from '../../../components/Label';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import Button from '../../../components/Button';
import Navigator from '../../../components/Navigator';
import Pagination from '../../../components/Pagination';
import Table from '../../../components/Table';
import Thead from '../../../components/Thead';
import Tr from '../../../components/Tr';
import Th from '../../../components/Th';
import Tbody from '../../../components/Tbody';
import Td from '../../../components/Td';


const initialForms = ({ id: 0, codigo: '', nome: '' })
const FormaPagamento = () => {
  const [formaPagamento, setFormaPagamento] = useState(initialForms);
  const [items, setItems] = useState([]);

  
  const getFormaPagamento = () => {
    fetch("http://localhost:8080/api/formapagamento")
    .then(response => response.json())
    .then(data => setItems(data))
    .catch(error => console.log("Erro ao consultar as formas de pagamentos" + error))
  }
  
  useEffect(() => {
    getFormaPagamento();
  }, []);
  
  //Paginação
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const pages = Math.ceil(items.length / itemsPerPage);
  const startIndex = itemsPerPage * currentPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormaPagamento({ ...formaPagamento, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formaPagamento.id === 0) {
      const url = "http://localhost:8080/api/formapagamento";
      fetch(url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(formaPagamento),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
        .then(response => response.json())
        .then((data) => {
          if (data) {
            getFormaPagamento();
          }
        });
    }
    else {
      const id = formaPagamento.id;

      const url = `http://localhost:8080/api/formapagamento/${id}`;
      fetch(url, {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(formaPagamento),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
        .then(response => response.json())
        .then((data) => {
          if (data) {
            getFormaPagamento();
          }
        });
    }
    setFormaPagamento(initialForms);
  }

  const handleUpdate = (id) => {
    fetch(`http://localhost:8080/api/FormaPagamento/${id}`)
      .then(response => response.json())
      .then(data => setFormaPagamento(data))
      .catch(error => console.log("Erro ao consultar" + error))
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/formapagamento/${id}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then((data) => {
        if (data) {
          getFormaPagamento();
          setFormaPagamento(initialForms);
        }
      })
  }

  const handleCancel = (e)=>{
    e.preventDefault();
    setFormaPagamento(initialForms);
  }

  useEffect(()=>{
    setCurrentPage(0);
  },[itemsPerPage])

  return (
    <>
      <Container>
        <Main>
          <Titulo title="Cadastro forma pagamento" />
          <Form>
            <FormGroup>
              <Label name="Código">
                <Input type="text" name="codigo" value={formaPagamento.codigo} placeholder='Informe o código' onchange={handleChange} />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label name="nome">
                <Input type="text" name="nome" value={formaPagamento.nome} placeholder='Informe o nome' onchange={handleChange} />
              </Label>
            </FormGroup>
            <Button name="Cadastrar" classe="botao cadastrar" onclick={handleSubmit} />
            <Button name="Cancelar" classe="botao cancelar" onclick={handleCancel} />
          </Form >
        </Main>
        <Main>
          <Titulo title="Lista formas pagamento" />
          <Navigator>
            <FormGroup>
              <Label>
                <Select value={itemsPerPage} onchange={(e) => setItemsPerPage(Number(e.target.value))}>
                  <option>{5}</option>
                  <option>{10}</option>
                  <option>{15}</option>
                </Select>
              </Label>
              <Label>
              <Input type="text" name="pesquisar" placeholder='Pesquisar' />
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
              return <Button  classe={Number(index) === currentPage ? "botao btnPagination active" : "botao btnActive"} name={Number(index) + 1} key={index} value={Number(index)} onclick={(e) => setCurrentPage(Number(e.target.value))}/>
            })}
          </Pagination>
          )}
        </Main>
      </Container>
    </>
  )
}

export default FormaPagamento