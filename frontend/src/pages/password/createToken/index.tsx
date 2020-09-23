import React, { useRef } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { Link } from 'react-router-dom'
import { Input } from '../../../components/input'
import { EmailSvg, SubmitSvg } from '../../../utils/svgs/svg'
import { Container, Content } from './styles'
import Logo from '../../../assets/Profitfy_logo.png'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { createTokenRequest } from '../../../store/ducks/repositories/password/actions'
import {
  ICreateToken,
  IPasswordChangeReducer,
} from '../../../store/ducks/repositories/password/types'
import { Validator } from '../../../utils/validation/ValidationError'

const CreateToken: React.FC = () => {
  const dispatch = useDispatch()
  const formRef = useRef<FormHandles>(null)
  const loading = useSelector(
    (state: IPasswordChangeReducer) => state.password.loading
  )

  const handleSubmit = async (data: ICreateToken) => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Insira um e-mail válido')
          .required('Campo obrigratório'),
      })

      await schema.validate(data, { abortEarly: false })

      dispatch(createTokenRequest(data))
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
          <p>Insira seu e-mail para modificar sua senha.</p>
          <div id="input">
            <EmailSvg />
            <Input type="email" name="email" placeholder="E-mail" />
          </div>
          <button type="submit">
            {loading ? (
              'Carregando...'
            ) : (
              <>
                <SubmitSvg />
                Enviar código
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

export default CreateToken
