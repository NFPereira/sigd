import React from 'react'

import Container from '../../components/Container'
import Titulo from '../../components/Titulo'
import Box from '../../components/Box'
import Card from '../../components/Card'
import Graficos from '../../components/Graficos'

const Home = () => {
    return (
        <div>
            <Container>
                <main>
                    <Titulo title="Home" />
                    <Box>
                        <Card titulo="Total de Vendas" value={23} />
                        <Card titulo="Total de Entradas" value={7} />
                        <Card titulo="Total de Fornecedores" value={6} />
                        <Card titulo="Total de Clientes" value={16} />
                    </Box>
                </main>

                <main>
                    <Titulo title="Gráficos"/>
                    <Box>
                        <Graficos>Grafico 1</Graficos>
                        <Graficos>Grafico 2</Graficos>
                    </Box>
                </main>
            </Container>
        </div>
    )
}

export default Home