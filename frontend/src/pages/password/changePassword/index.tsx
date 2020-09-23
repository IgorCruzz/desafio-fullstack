import React, { useRef, useState } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { Link, useParams } from 'react-router-dom'
import { Input } from '../../../components/input'
import { EmailSvg, PasswordSvg, SubmitSvg } from '../../../utils/svgs/svg'
import { Container, Content } from './styles'
import Logo from '../../../assets/Profitfy_logo.png'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import {
  IChangePassword,
  IPasswordChangeReducer,
} from '../../../store/ducks/repositories/password/types'
import { changePasswordRequest } from '../../../store/ducks/repositories/password/actions'
import { Validator } from '../../../utils/validation/ValidationError'

const ChangePassword: React.FC = () => {
  const params: { code: string } = useParams()
  const [passwordButton, setPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState(false)
  const formRef = useRef<FormHandles>(null)
  const loading = useSelector(
    (state: IPasswordChangeReducer) => state.password.loading
  )
  const dispatch = useDispatch()

  const handleSubmit = async (data: IChangePassword) => {
    try {
      const schema = Yup.object().shape({
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
      })

      await schema.validate(data, { abortEarly: false })

      const { code, ...rest } = data

      dispatch(
        changePasswordRequest({
          code: params.code,
          ...rest,
        })
      )
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
          <p>Atualize sua senha.</p>
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

          <button type="submit">
            {loading ? (
              'Carregando...'
            ) : (
              <>
                <SubmitSvg />
                Trocar senha
              </>
            )}
          </button>
        </Form>

        <Link to="/">
          <AiOutlineArrowLeft />
          Voltar para o menu
        </Link>
      </Content>
    </Container>
  )
}

export default ChangePassword
