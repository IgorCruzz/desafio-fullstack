import React, { useRef, useContext, useCallback } from 'react'
import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { BsFillPersonFill } from 'react-icons/bs'
import { MdAccountCircle } from 'react-icons/md'
import { MdEmail } from 'react-icons/md'
import { FaUnlockAlt } from 'react-icons/fa'

import logoImg from '../../assets/logo/internal-logo/profitfy_logo.svg'
import airplaneIcon from '../../assets/images/icons/paper-airplane.svg'
import Brazil from '../../assets/images/icons/brazil.svg'

import * as Yup from 'yup'
import api from '../../../infra/services/http/api'
import { useHistory } from 'react-router-dom'
import { ThemeContext } from 'styled-components'
import getValidationErrors from '../../../validation/yup/getValidationErrors'

import Input from '../../components/Input'
import InputSignUp from '../../components/InputSignUp'
import InputMasked from '../../components/InputMasked'
import Text from '../../components/Text'
import { Container, Title, Content, Button } from './styles'

interface SignUpFormData {
  name: string
  email: string
  lastname: string
  phone: string
  password: string
  passwordConfirmation: string
}

interface SignInFormData {
  email: string
  password: string
}

const AccountLog: React.FC = () => {
  const { signIn } = useAuth()

  const history = useHistory()
  const { addToast } = useToast()

  const formRef = useRef<FormHandles>(null)

  const theme = useContext(ThemeContext).colors
  const $ = (elem: string): HTMLElement | null => window.document.querySelector<HTMLElement>(elem)

  const handleFormPanelTwo = async () => {
    const formPanelTwo = $('.form-panel.two')
    const panelTwo = formPanelTwo?.scrollHeight
    const Form = $('.form')
    const formHeight = Form?.clientHeight

    $('.form-toggle')?.classList.add('visible')
    $('.form-panel.one')?.classList.add('hidden')
    $('.form-panel.two')?.classList.add('active')

    if (Form) {
      Form.animate({
        height: [`${formHeight}px`, `${panelTwo}px`]
      }, {
        duration: 500, // number in ms [this would be equiv of your speed].
        easing: 'ease-in-out',
        iterations: 1 // infinity or a number.
        // fill: ''
      })

      Form.style.height = `${panelTwo}px`
    }
  }

  const handleToggle = () => {
    const formPanelOne = $('.form-panel.one')
    const panelOne = formPanelOne?.clientHeight
    const Form = $('.form')
    const formHeight = Form?.clientHeight

    $('.form-toggle')?.classList.remove('visible')
    $('.form-panel.one')?.classList.remove('hidden')
    $('.form-panel.two')?.classList.remove('active')

    if (Form) {
      Form.animate({
        height: [`${formHeight}px`, `${panelOne}px`]
      }, {
        duration: 500, // number in ms [this would be equiv of your speed].
        direction: 'normal',
        easing: 'ease-in-out',
        iterations: 1 // infinity or a number.
        // fill: ''
      })

      Form.style.height = `${panelOne}px`
    }
  }

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha é obrigatória'),
        })

        await schema.validate(data, { abortEarly: false })

        await signIn({
          email: data.email,
          password: data.password,
        })

        addToast({
          type: 'success',
          title: 'Logado com sucesso!',
          description: 'Bem vindo ao Profitfy.me!',
        })

        history.push('/dashboard')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um error ao fazer login, cheque as credenciais.',
        })
      }
    },
    [signIn, addToast, history],
  )

  const handleRegister = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          lastname: Yup.string().required('Sobrenome é obirgatório'),
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          phone: Yup.string().required('O telefone é obrigatório'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Confirmação incorreta')
        })

        await schema.validate(data, { abortEarly: false })

        await api.post('/account/create', data)

        handleToggle()

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu logon no Profitfy.me!',
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)
          return
        }

        addToast({
          type: 'error',
          title: 'Erro na cadastro',
          description: 'Ocorreu um error ao fazer cadastro, tente novamente.',
        })
      }
    },
    [addToast, history],
  )

  return (
    <Container>
      <Title>
        <img src={logoImg} style={{ height: 325, width: 325, marginLeft: -35 }} alt="Logo Profitfy.me" />
        <br />
        <Text text="Seu dashboard de respeito!" size={1.2} color="#FFFFFF" />
      </Title>

      <Content className="form">
        <div className="form-toggle" onClick={handleToggle}></div>
        <div className="form-panel one">
          <div className="form-header">
            <h1>Fazer Login</h1>
          </div>
          <div className="form-content">
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input name="email" icon={MdEmail} placeholder="E-mail" />

              <Input
                name="password"
                icon={FaUnlockAlt}
                type="password"
                placeholder="Senha"
              />

              <label className="form-remember">
                <input type="checkbox"/>Lembrar-me
                <a className="form-recovery" href="/#">Esqueci minha senha</a>
              </label>

              <Button type="submit">Entrar</Button>
            </Form>
          </div>
        </div>
        <div className="form-panel two" onClick={handleFormPanelTwo}>
          <div className="form-header">
            <h1>Fazer cadastro</h1>
          </div>
          <div className="form-content">
            <Form ref={formRef} onSubmit={handleRegister} >
              <InputSignUp
                type="text"
                name="name"
                placeholder="Nome"
                icon={BsFillPersonFill}
              />

              <InputSignUp
                type="text"
                name="lastname"
                placeholder="Sobrenome"
                icon={MdAccountCircle}
              />

              <InputMasked mask="(99) 99999-9999" icon={Brazil} type="text" name="phone"/>
             {/* <InputSignUp
                type="text"
                name="phone"
                placeholder="Telefone"
                icon={AiTwotonePhone}
              /> */}

              <InputSignUp
                type="email"
                name="email"
                placeholder="E-mail"
                icon={MdEmail}
              />

              <InputSignUp
                type="password"
                name="password"
                placeholder="Senha"
                icon={FaUnlockAlt}
              />

              <InputSignUp
                type="password"
                name="passwordConfirmation"
                placeholder="Confirmar Senha"
                icon={FaUnlockAlt}
              />

              <Button type="submit">
                <img src={airplaneIcon} alt="airplane icon"/>
                Cadastrar
              </Button>
            </Form>
          </div>
        </div>
      </Content>
    </Container>
  )
}

export default AccountLog
