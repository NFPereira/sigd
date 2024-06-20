import React from 'react'

//import components
import Footer from './components/Footer'

//import react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


//import pages
import Home from './pages/Home'
import Paises from './pages/Cadastros/Paises'
import Estados from './pages/Cadastros/Estados'
import Cidades from './pages/Cadastros/Cidades'
import TipoPessoa from './pages/Cadastros/TipoPessoa'
import Sexo from './pages/Cadastros/Sexo'
import FretePorConta from './pages/Cadastros/FretePorConta'
import FormaPagamento from './pages/Cadastros/FormaPagamento'
import CategoriaProduto from './pages/Cadastros/CategoriaProduto'
import GrupoProduto from './pages/Cadastros/GrupoProduto'
import ClassificacaoFiscal from './pages/Cadastros/ClassificacaoFiscal'
import CorProduto from './pages/Cadastros/CorProduto'
import LocalArmazenamento from './pages/Cadastros/LocalArmazenamento'
import MarcaProduto from './pages/Cadastros/MarcaProduto'
import Natureza from './pages/Cadastros/Natureza'
import NivelUsuario from './pages/Cadastros/NivelUsuario'
import Navbars from './components/Navbar'
import Clientes from './pages/Cadastros/Clientes'
import Fornecedores from './pages/Cadastros/Fornecedores'
import Usuario from './pages/Cadastros/Usuario'
import Produto from './pages/Cadastros/Produto'
import Login from './pages/Conta/Login'

const App = () => {
  return (
    <Router>
      <Navbars />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastros-paises" element={<Paises />} />
        <Route path="/cadastros-estados" element={<Estados />} />
        <Route path="/cadastros-cidades" element={<Cidades />} />
        <Route path="/cadastros-tipo-pessoa" element={<TipoPessoa />} />
        <Route path="/cadastros-sexo" element={<Sexo />} />
        <Route path="/cadastros-frete-por-conta" element={<FretePorConta />} />
        <Route path="/cadastros-clientes" element={<Clientes />} />
        <Route path="/cadastros-fornecedores" element={<Fornecedores />} />
        <Route path="/cadastros-forma-pagamento" element={<FormaPagamento />} />
        <Route path="/cadastros-categoria-produto" element={<CategoriaProduto />} />
        <Route path="/cadastros-grupo-produto" element={<GrupoProduto />} />
        <Route path="/cadastros-classificacao-fiscal" element={<ClassificacaoFiscal />} />
        <Route path="/cadastros-cor-produto" element={<CorProduto />} />
        <Route path="/cadastros-local-armazenamento" element={<LocalArmazenamento />} />
        <Route path="/cadastros-marca-produto" element={<MarcaProduto />} />
        <Route path="/cadastros-natureza" element={<Natureza />} />
        <Route path="/cadastros-produto" element={<Produto />} />
        <Route path="/cadastros-nivel-usuario" element={<NivelUsuario />} />
        <Route path="/cadastros-usuario" element={<Usuario />} />
        <Route path="/conta/login" element={<Login/> }/>
      </Routes>
      <Footer />
    </Router>
  )
}

export default App