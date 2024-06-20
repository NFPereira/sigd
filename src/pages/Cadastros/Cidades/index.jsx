import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import Titulo from '../../../components/Titulo';
import Container from '../../../components/Container';
import Main from '../../../components/Main';
import Form from '../../../components/Form';
import FormGroup from '../../../components/FormGroup';
import Label from '../../../components/Label';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import FormRadio from '../../../components/FormRadio';
import Span from '../../../components/Span';
import Button from '../../../components/Button';
import Navigator from '../../../components/Navigator';
import Table from '../../../components/Table';
import Thead from '../../../components/Thead';
import Tr from '../../../components/Tr';
import Th from '../../../components/Th';
import Tbody from '../../../components/Tbody';
import Td from '../../../components/Td';
import Pagination from '../../../components/Pagination';
import { FaEdit, FaToggleOff, FaToggleOn, FaTrash } from 'react-icons/fa';



const initialForms = ({ id: 0, codigo: '', nome: '', idEstado: 0, ativo: true });
const Cidades = () => {
  const [cidades, setCidades] = useState(initialForms);
  const [estados, setEstados] = useState([]);
  const [items, setItems] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  const getCidades = () => {
    fetch("http://localhost:8080/api/cidade/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setItems(data);
      })
  }
  const getEstados = () => {
    fetch("http://localhost:8080/api/Estado/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          setEstados(data)
        }
      })
  }

  useEffect(() => {
    getCidades();
    getEstados();
  }, []);

  //Paginação
  const pages = Math.ceil(items.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);



  const handleRadio = (e) => {
    const isSelected = e.target.value === 'true' ? true : false;
    setCidades({ ...cidades, ativo: isSelected });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCidades({ ...cidades, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cidades.id === 0) {

      const url = "http://localhost:8080/api/cidade/";

      fetch(url, {
        method: 'POST',
        body: JSON.stringify(cidades),
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data) {
            getCidades();
          }
        })
    }
    else {
      const id = cidades.id;
      const url = `http://localhost:8080/api/cidade/${id}`;

      fetch(url, {
        method: "PUT",
        mode: 'cors',
        body: JSON.stringify(cidades),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data) {
            getCidades();
          }
        })
    }
    setCidades(initialForms);
  }

  const handleUpdate = (id) => {
    const url = `http://localhost:8080/api/cidade/${id}`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCidades(data);
      });


  }

  const handleDelete = (id) => {
    const url = `http://localhost:8080/api/cidade/${id}`;

    fetch(url, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json()

      })
      .then((data) => {
        if (data) {
          getCidades();
          setCidades(initialForms);
        }
      })
  }
  const handleCancel = (e) => {
    e.preventDefault();
    setCidades(initialForms);
  }

  useEffect(() => {
    setCurrentPage(0);
  }, [itemsPerPage])



  return (
    <>
      <Container>
        <Main>
          <Titulo title="Cadastro de cidade" />
          <Form>
            <FormGroup>
              <Label name="Código">
                <Input type="text" name="codigo" value={cidades.codigo} placeholder="Informe o código" onchange={handleChange} />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label name="Nome">
                <Input type="text" name="nome" value={cidades.nome} placeholder="Informe o nome" onchange={handleChange} />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label name="Estado">
                <Select name="idEstado" value={cidades.idEstado} onchange={handleChange} >
                  <option>SELECIONE</option>
                  {estados.map((estado, index) => (
                    <option key={index} value={estado.id}>{estado.nome}</option>
                  ))}
                </Select>
              </Label>
            </FormGroup>
            <FormRadio>
              <Label name="Ativo" />
              <Input type="radio" name="ativo" value="true" valorSelecionado={cidades.ativo === true} onchange={handleRadio} /><Span name="Sim" />
              <Input type="radio" name="ativo" value="false" valorSelecionado={cidades.ativo === false} onchange={handleRadio} /><Span name="Não" />
            </FormRadio>
            <Button name="Cadastrar" onclick={handleSubmit} classe="botao cadastrar" />
            <Button name="Cancelar" onclick={handleCancel} classe="botao cancelar" />
          </Form>
        </Main>

        <Main>
          <Titulo title="Lista de cidades" />
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
              <Label>
                <Select name="idEstado" value={cidades.idEstado} onchange={handleChange}>
                  {estados.map((estado, index) => (
                    <option key={index} value={estado.id}>{estado.nome}</option>
                  ))}
                </Select>
              </Label>
            </FormGroup>
          </Navigator>
          <Table classe='tabela'>
            <Thead>
              <Tr>
                <Th name="Código" />
                <Th name="Nome" />
                <Th name="Estado" />
                <Th name="Ativo" />
                <Th name="Ações" />
              </Tr>
            </Thead>
            <Tbody>
              {currentItems.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.codigo}</Td>
                  <Td>{item.nome}</Td>
                  <Td>{item.idEstado}</Td>
                  <Td>{item.ativo ? <FaToggleOn className='toggleOn' /> : <FaToggleOff className='toggleOff' />}</Td>
                  <Td>
                    <FaEdit className='edit' onClick={() => handleUpdate(item.id)} />
                    <FaTrash className='delete' onClick={() => handleDelete(item.id)} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Pagination>
            {Array.from(Array(pages), (item, index) => {
              while (index <= 5) {
                return <Button key={index} value={Number(index)} name={Number(index + 1)} classe={Number(index) === currentPage ? "botao btnPagination active" : "botao btnPagination"} onclick={(e) => setCurrentPage(Number(e.target.value))} />
              }
            })}
          </Pagination>
        </Main>
      </Container>
    </>
  )
};

export default Cidades;