import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChangePassword from '../../pages/password/changePassword'
import React from 'react'
import * as redux from 'react-redux'

jest.mock('react-redux')

jest.mock('react-router-dom', () => {
  return {
    useParams: () => {
      return {
        code: 'CODE',
      }
    },
    Link: ({ children }: { children: React.ReactNode }) => children,
  }
})

describe('ChangePassword', () => {
  it('should be able to render', () => {
    expect(render(<ChangePassword />)).toBeTruthy()
  })

  it('should be able to change the password', async () => {
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    render(<ChangePassword />)

    userEvent.type(screen.getByPlaceholderText('E-mail'), 'email@gmail.com')

    userEvent.type(screen.getByPlaceholderText('Senha'), 'password')

    userEvent.type(screen.getByPlaceholderText('Confirmar senha'), 'password')

    userEvent.click(screen.getByRole('button', { name: 'Trocar senha' }))

    await waitFor(() => {
      expect(dispatch).toBeCalled()
    })
  })

  it('dont dispatch if has any wrong', async () => {
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    render(<ChangePassword />)

    userEvent.type(screen.getByPlaceholderText('E-mail'), ' ')

    userEvent.type(screen.getByPlaceholderText('Senha'), ' ')

    userEvent.type(screen.getByPlaceholderText('Confirmar senha'), ' ')

    userEvent.click(screen.getByRole('button', { name: 'Trocar senha' }))

    await waitFor(() => {
      expect(dispatch).not.toBeCalled()
    })
  })

  it('shows "carregando.." if submit button has been pressed', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
      cb({
        password: {
          loading: true,
        },
      })
    )

    render(<ChangePassword />)

    expect(
      screen.getByRole('button', { name: 'Carregando...' })
    ).toBeInTheDocument()
  })

  it('should be able to change input password type', async () => {
    render(<ChangePassword />)

    userEvent.click(screen.getByTestId('password'))
    userEvent.click(screen.getByTestId('password'))
    userEvent.click(screen.getByTestId('confirmPassword'))
    userEvent.click(screen.getByTestId('confirmPassword'))

    expect(screen.getByTestId('password')).toBeInTheDocument()
    expect(screen.getByTestId('confirmPassword')).toBeInTheDocument()
  })
})
