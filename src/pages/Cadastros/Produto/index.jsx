import React, { useEffect, useState } from 'react'

import Container from '../../../components/Container'
import Main from '../../../components/Main'
import Titulo from '../../../components/Titulo'
import Table from '../../../components/Table'
import Thead from '../../../components/Thead'
import Tr from '../../../components/Tr'
import Th from '../../../components/Th'
import Tbody from '../../../components/Tbody'
import Td from '../../../components/Td'
import Button from '../../../components/Button'
import Pagination from '../../../components/Pagination';
import Label from '../../../components/Label';
import FormGroup from '../../../components/FormGroup';
import FormRadio from '../../../components/FormRadio';
import Navigator from '../../../components/Navigator';
import Select from '../../../components/Select';
import Input from '../../../components/Input';
import Span from '../../../components/Span';
import { FaEdit, FaToggleOff, FaToggleOn, FaTrash } from 'react-icons/fa'

const Produto = () => {
  const [items, setItems] = useState([]);

  const getProduto = () => {
    fetch("http://localhost:8080/api/produto")
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.log("Erro ao consultar " + error));
  }

  useEffect(() => {
    getProduto();
  }, []);

  //Paginação
  const[itemsPerPage, setItemsPerPage] = useState(5);
  const[currentPage, setCurrentPage] = useState(0);
  const startIndex = itemsPerPage * currentPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);
  const pages = Math.ceil(items.length / itemsPerPage);



  return (
    <>
      <Container>
        <Main>
          <Titulo title="Cadastrar Produto" />
          <FormGroup>
            <Label name="Código">
            <Input type="text" name="codigo" placeholder="Informe o código de barras"/>
            </Label>
            <Label name="Cód. Barras">
            <Input type="text" name="codigo" placeholder="Informe o código"/>
            </Label>
            <Label name="Nome">
            <Input type="text" name="nome" placeholder="Informe o nome"/>
            </Label>
          </FormGroup>
          <FormGroup>
            <Label name="Preço de Custo">
            <Input type="text" name="precoCusto" placeholder="Informe o preço de custo"/>
            </Label>
            <Label name="Preço de Venda">
            <Input type="text" name="precoVenda" placeholder="Informe o preço de venda"/>
            </Label>
            <Label name="Quant. Estoque">
            <Input type="text" name="quantEstoque" placeholder="Informe a quantidade de estoque"/>
            </Label>
          </FormGroup>
          <FormGroup>
            <Label name="Unidade Medida">
              <Select name="idUnidadeMedida">
                <option value={0}>Selecione</option>
              </Select>
            </Label>
            <Label name="Localização">
            <Input type="text" name="localizacao" placeholder="Informe a localização"/>
            </Label>
          </FormGroup>
          <FormGroup>
            <Label name="Cor do Produto">
            <Select name="idCorProduto">
                <option value={0}>Selecione</option>
              </Select>
            </Label>
            <Label name="Grupo Produto">
            <Select name="idGrupoProduto">
                <option value={0}>Selecione</option>
              </Select>
            </Label>
            <Label name="Categoria Produto">
            <Select name="idCategoriaProduto">
                <option value={0}>Selecione</option>
              </Select>
            </Label>
          </FormGroup>
          <FormGroup>
            <Label name="Classificação Fiscal">
                <Select name="idClassificacaoFiscal">
                  <option value={0}>Selecione</option>
                </Select>
            </Label>
            <Label name="Local Armazenamento">
            <Select name="idLocalArmazenamento">
                <option value={0}>Selecione</option>
            </Select>
            </Label>
            <Label name="Estoque Mínimo">
            <Input type="text" name="estoqueMinimo" placeholder="Informe o estoque mínimo"/>
            </Label>
          </FormGroup>
          <FormGroup>
            <Label name="Marca Produto">
            <Select name="idMarcaProduto">
                <option value={0}>Selecione</option>
            </Select>
            </Label>
            <Label name="Fornecedor">
            <Select name="idFornecedor">
                <option value={0}>Selecione</option>
            </Select>
            </Label>
          </FormGroup>
          <FormGroup>
            <Label name="Foto Produto">
            <Input type="text" name="codigo" placeholder="Informe o código"/>
            </Label>
          </FormGroup>
          <FormRadio>
            <Label name="Ativo"/>
            <Input type="radio" name="ativo" value="true" /><Span name="Sim"/>
            <Input type="radio" name="ativo" value="false" /><Span name="Não"/>
          </FormRadio>
          <Button name="Cadastrar" classe="botao cadastrar"/>
          <Button name="Cancelar" classe="botao cancelar"/>
        </Main>
        <Main>
          <Titulo title="Listar Produto" />
          <Navigator>
              <FormGroup>
                <Label>
            <Select>
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
                <Th name="Cod. Barras" />
                <Th name="Nome" />
                <Th name="Qtde" />
                <Th name="P. Custo" />
                <Th name="P. Venda" />
                <Th name="Est. Min" />
                <Th name="Ativo" />
                <Th name="Ações" />
              </Tr>
            </Thead>
            <Tbody>
              {currentItems.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.codigoBarras}</Td>
                  <Td>{item.nome}</Td>
                  <Td>{item.quantEstoque}</Td>
                  <Td>{item.precoCusto}</Td>
                  <Td>{item.precoVenda}</Td>
                  <Td>{item.estoqueMinimo}</Td>
                  <Td>{item.ativo ? <FaToggleOn className='toggleOn'/> : <FaToggleOff className='toggleOff'/>}</Td>
                  <Td>
                  <FaEdit className='edit' onClick={() => handleUpdate(item.id)}/>
                  <FaTrash className='delete' onClick={() => handleDelete(item.id)}/>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Pagination>
            {Array.from(Array(pages), (item,index)=>{
              return <Button classe={Number(index) === currentPage ? "botao btnPagination active": "botao btnPagination"} name={Number(index) + 1} value={Number(index)} onclick={(e)=>setCurrentPage(Number(e.target.value))}/>
            })}
          </Pagination>
        </Main>
      </Container>
    </>
  )
}

export default Produto