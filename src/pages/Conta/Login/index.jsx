import React from 'react'
import styles from './styles.module.css'
import Form from '../../../components/Form'
import FormGroup from '../../../components/FormGroup'
import Container from '../../../components/Container'
import Input from '../../../components/Input'
import Label from '../../../components/Label'
import Button from '../../../components/Button'
import { BiChevronRight } from "react-icons/bi";

const Login = () => {
  return (
    <>
      <Container>
        <div className={styles.boxLogin}>
          <div className={styles.boxTitle}>FAÇA SEU LOGIN</div>
          <Form>
            <FormGroup>
              <Label>
                <Input type="text" name="usuario" placeholder="Usuário" />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>
                <Input type="password" name="password" placeholder="Senha" />
              </Label>
            </FormGroup>
            <Button name="Acessar" classe="botao acessar" icon={<BiChevronRight />} />
          </Form>
        </div>


      </Container>
    </>
  )
}

export default Login