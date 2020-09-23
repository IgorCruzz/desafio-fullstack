import React, { useRef, useState } from 'react'
import { Form } from '@unform/web'
import { Link } from 'react-router-dom'
import { FormHandles } from '@unform/core'
import { Input } from '../../components/input'
import { Container, Content, Links } from './styles'
import Logo from '../../assets/Profitfy_logo.png'
import { SubmitSvg, EmailSvg, PasswordSvg } from '../../utils/svgs/svg'
import { useDispatch, useSelector } from 'react-redux'
import {
  ISignin,
  ISigninReducer,
} from '../../store/ducks/repositories/signin/types'
import { signInRequest } from '../../store/ducks/repositories/signin/actions'
import * as Yup from 'yup'
import { Validator } from '../../utils/validation/ValidationError'

const Signin: React.FC = () => {
  const dispatch = useDispatch()
  const [passwordButton, setPassword] = useState(false)
  const formRef = useRef<FormHandles>(null)
  const loading = useSelector((state: ISigninReducer) => state.signIn.loading)

  const handleSubmit = async (data: ISignin) => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Insira um e-mail válido')
          .required('Campo obrigratório'),
        password: Yup.string().required('Campo obrigratório'),
      })

      await schema.validate(data, { abortEarly: false })

      dispatch(signInRequest(data))
    } catch (err) {
      const Error = Validator(err)

      formRef.current?.setErrors(Error)
    }
  }

  return (
    <Container>
      <Content>
        <img src={Logo} alt="logo" />

        <Form onSubmit={handleSubmit} ref={formRef}>
          <div id="input">
            <EmailSvg />
            <Input type="email" name="email" placeholder="E-mail" />
          </div>

          <div id="passwordInput">
            <PasswordSvg />
            <Input
              name="password"
              type={!passwordButton ? 'password' : 'text'}
              placeholder="Senha"
            />
            <button
              type="button"
              id="type"
              data-testid="password"
              onClick={() =>
                passwordButton ? setPassword(false) : setPassword(true)
              }>
              mostrar
            </button>
          </div>

          <button type="submit">
            {loading ? (
              'Carregando...'
            ) : (
              <>
                <SubmitSvg />
                Entrar
              </>
            )}
          </button>
        </Form>
        <Links>
          <Link to="/createToken">Esqueceu sua senha?</Link>
          <Link to="/signup">Cadastrar</Link>
        </Links>
      </Content>
    </Container>
  )
}

export default Signin
