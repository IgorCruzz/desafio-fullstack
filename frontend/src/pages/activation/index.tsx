import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Content } from './styles'
import Logo from '../../assets/Profitfy_logo.png'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { activationRequest } from '../../store/ducks/repositories/activation/actions'
import { SubmitSvg } from '../../utils/svgs/svg'
import { IActivationReducer } from '../../store/ducks/repositories/activation/types'

const Activation: React.FC = () => {
  const dispatch = useDispatch()
  const params: { token: string } = useParams()
  const loading = useSelector(
    (state: IActivationReducer) => state.activation.loading
  )

  return (
    <Container>
      <img src={Logo} alt="logo" />
      <Content>
        <p>Clique no botão abaixo para ativar sua conta</p>
        <button
          type="button"
          onClick={() =>
            dispatch(
              activationRequest({
                token: params.token,
              })
            )
          }>
          {loading ? (
            'Carregando...'
          ) : (
            <>
              <SubmitSvg />
              Ativar conta
            </>
          )}
        </button>
      </Content>

      <Link to="/">
        <AiOutlineArrowLeft />
        Voltar para o menu
      </Link>
    </Container>
  )
}

export default Activation
