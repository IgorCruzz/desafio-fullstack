import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Signin from '../../pages/signin'
import React from 'react'
import * as redux from 'react-redux'

jest.mock('react-redux')

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  }
})

describe('Signin', () => {
  it('should be able to render', async () => {
    expect(render(<Signin />)).toBeTruthy()
  })

  it('should be to dispatch signin action', async () => {
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    render(<Signin />)

    userEvent.type(screen.getByPlaceholderText('E-mail'), 'user@gmail.com')
    userEvent.type(screen.getByPlaceholderText('Senha'), 'password')

    userEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    await waitFor(() => {
      expect(dispatch).toBeCalled()
    })
  })

  it('dont dispatch has any wrong', async () => {
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    render(<Signin />)

    userEvent.type(screen.getByPlaceholderText('E-mail'), '')
    userEvent.type(screen.getByPlaceholderText('Senha'), '')

    userEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    await waitFor(() => {
      expect(dispatch).not.toBeCalled()
    })
  })

  it('shows "carregando.." if submit button has been pressed', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
      cb({
        signIn: {
          loading: true,
          signed: false,
        },
      })
    )

    render(<Signin />)

    expect(
      screen.getByRole('button', { name: 'Carregando...' })
    ).toBeInTheDocument()
  })

  it('should be able to change input password type', () => {
    render(<Signin />)

    userEvent.click(screen.getByTestId('password'))

    userEvent.click(screen.getByTestId('password'))

    expect(screen.getByTestId('password')).toBeInTheDocument()
  })
})
