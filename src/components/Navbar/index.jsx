import React from 'react'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'

const Navbars = () => {
    return (
        <div className={styles.navbar}>
            <nav>
                <div className={styles.brand}>
                    <Link to="/">SIGD</Link>
                </div>
                <ul className={styles.menu}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link>Cadastros</Link>
                        <ul>
                            <li><Link to="/cadastros-paises">Paises</Link></li>
                            <li><Link to="/cadastros-estados">Estados</Link></li>
                            <li><Link to="/cadastros-cidades">Cidades</Link></li>
                            <hr />
                            <li><Link to="/cadastros-tipo-pessoa">Tipo Pessoa</Link></li>
                            <li><Link to="/cadastros-sexo">Sexo</Link></li>
                            <li><Link to="/cadastros-frete-por-conta">Frete Por Conta</Link></li>
                            <li><Link to="/cadastros-clientes">Clientes</Link></li>
                            <li><Link to="/cadastros-fornecedores">Fornecedores</Link></li>
                            <li><Link to="/cadastros-forma-pagamento">Formas Pagamento</Link></li>
                            <hr />
                            <li><Link to="/cadastros-categoria-produto">Categoria Produto</Link></li>
                            <li><Link to="/cadastros-grupo-produto">Grupo Produto</Link></li>
                            <li><Link to="/cadastros-classificacao-fiscal">Classificação Fiscal</Link></li>
                            <li><Link to="/cadastros-cor-produto">Cor Produto</Link></li>
                            <li><Link to="/cadastros-local-armazenamento">Local Armazenamento</Link></li>
                            <li><Link to="/cadastros-marca-produto">Marca Produto</Link></li>
                            <li><Link to="/cadastros-natureza">Natureza</Link></li>
                            <li><Link to="/cadastros-produto">Produto</Link></li>
                            <hr />
                            <li><Link to="/cadastros-nivel-usuario">Nível Usuário</Link></li>
                            <li><Link to="/cadastros-usuario">Usuário</Link></li>
                        </ul>
                    </li>
                    <li><Link>Operações</Link></li>
                    <li><Link>Gráficos</Link></li>
                    <li><Link>Relatórios</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbars