import React from 'react'

import { Container, Content } from './styles'
import logo from '../../assets/Profitfy_logo.png'
import { useDispatch } from 'react-redux'
import { signOut } from '../../store/ducks/repositories/signin/actions'

const Header: React.FC = () => {
  const dispatch = useDispatch()

  return (
    <Container>
      <Content>
        <img src={logo} alt="logo" />
        <button type="button" onClick={() => dispatch(signOut())}>
          Sair
        </button>
      </Content>
    </Container>
  )
}

export default Header
