import React, { useRef, useState } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { Container, Content, Links } from './styles'
import { Link } from 'react-router-dom'
import { Input, PhoneInput } from '../../components/input'
import {
  NameSvg,
  LastnameSvg,
  EmailSvg,
  PasswordSvg,
  SubmitSvg,
  FlagSvg,
} from '../../utils/svgs/svg'
import Logo from '../../assets/Profitfy_logo.png'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { UserCreateRequest } from '../../store/ducks/repositories/user/actions'
import {
  IUserCreate,
  IUserReducer,
} from '../../store/ducks/repositories/user/types'
import { Validator } from '../../utils/validation/ValidationError'

const Signup: React.FC = () => {
  const dispatch = useDispatch()
  const [passwordButton, setPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState(false)
  const formRef = useRef<FormHandles>(null)
  const loading = useSelector((state: IUserReducer) => state.user.loading)
  const handleSubmit = async (data: IUserCreate) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .min(5, 'O nome precisa ter no mínimo 5 caracteres')
          .max(20, 'O nome precisa ter no máximo 20 caracteres')
          .required('Campo obrigratório'),
        lastname: Yup.string()
          .min(5, 'O nome precisa ter no mínimo 5 caracteres')
          .max(50, 'O nome precisa ter no máximo 50 caracteres')
          .required('Campo obrigratório'),
        email: Yup.string()
          .email('Insira um e-mail válido')
          .required('Campo obrigratório'),
        password: Yup.string()
          .min(5, 'A senha precisa ter no mínimo 5 caracteres')
          .required('Campo obrigratório'),
        confirmPassword: Yup.string()
          .oneOf(
            [Yup.ref('password'), 'O campo de senha não bate'],
            'O campo de senha não bate'
          )
          .required('Campo obrigratório')
          .typeError('O campo de senha não bate'),
        cellphone: Yup.string().required('Campo obrigratório'),
      })

      await schema.validate(data, { abortEarly: false })

      dispatch(UserCreateRequest(data))
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
          <strong>Informe seus dados</strong>
          <div id="input">
            <NameSvg />
            <Input name="name" placeholder="Nome" />
          </div>

          <div id="input">
            <LastnameSvg />
            <Input name="lastname" placeholder="Sobrenome" />
          </div>

          <div id="input">
            <EmailSvg />
            <Input name="email" type="email" placeholder="E-mail Pessoal" />
          </div>

          <div id="input">
            <FlagSvg />
            <PhoneInput name="cellphone" placeholder="99 9 9999 9999" />
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

          <div id="passwordInput">
            <PasswordSvg />
            <Input
              name="confirmPassword"
              type={!confirmPassword ? 'password' : 'text'}
              placeholder="Confirmar senha"
            />
            <button
              type="button"
              id="type"
              data-testid="confirmPassword"
              onClick={() =>
                confirmPassword
                  ? setConfirmPassword(false)
                  : setConfirmPassword(true)
              }>
              mostrar
            </button>
          </div>

          <p>
            Ao se cadastrar você automaticamente concorda com nossos
            <Link to="/terms" target="_blank">
              Termos de Uso
            </Link>
          </p>
          <button type="submit">
            {loading ? (
              'Carregando...'
            ) : (
              <>
                <SubmitSvg />
                Cadastrar
              </>
            )}
          </button>
        </Form>
        <Links>
          <Link to="/createToken">Esqueceu sua senha?</Link>
          <Link to="/">Entrar</Link>
        </Links>
      </Content>
    </Container>
  )
}
export default Signup
