import React from 'react'
import MenuIcon from '@material-ui/icons/Menu'

import { FiPower } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import * as S from './styles'

import logoImg from '../../assets/logo/internal-logo/profitfy_logo.svg'
import { useAuth } from '../../hooks/auth'

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth()

  return (
    <S.Container>
      <S.Header>
        <S.HeaderContent>
          <MenuIcon style={{ marginLeft: -45, marginRight: 35, height: 50, width: 50 }} />
          <img src={logoImg} alt="Profitfy.me logo" />

          <S.HeaderProfile>
            <img
              src={
                user?.avatar_url ||
                'https://api.adorable.io/avatars/56/abott@adorable.io.png'
              }
              alt={user?.name}
            />

            <div>
              <span>Bem-vindo,</span>
              <Link to="/profile">
                <strong>{user?.name}</strong>
              </Link>
            </div>
          </S.HeaderProfile>

          <button type="button" onClick={signOut}>
            <FiPower size={20} />
          </button>
        </S.HeaderContent>
      </S.Header>

      <S.Content>
      </S.Content>
    </S.Container>
  )
}

export default Dashboard
