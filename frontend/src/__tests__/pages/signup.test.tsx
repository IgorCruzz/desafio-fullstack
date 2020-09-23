import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Signup from '../../pages/signup'
import React from 'react'
import * as redux from 'react-redux'

jest.mock('react-redux')

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  }
})

describe('Signup', () => {
  it('should be able to render', () => {
    expect(render(<Signup />)).toBeTruthy()
  })

  it('should be able to register', async () => {
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    render(<Signup />)

    userEvent.type(screen.getByPlaceholderText('Nome'), 'username')

    userEvent.type(screen.getByPlaceholderText('Sobrenome'), 'lastname')

    userEvent.type(
      screen.getByPlaceholderText('E-mail Pessoal'),
      'email@gmail.com'
    )

    fireEvent.change(screen.getByPlaceholderText('99 9 9999 9999'), {
      target: {
        value: '21999999999',
      },
    })

    userEvent.type(screen.getByPlaceholderText('Senha'), 'password')

    userEvent.type(screen.getByPlaceholderText('Confirmar senha'), 'password')

    userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }))

    await waitFor(() => {
      expect(dispatch).toBeCalled()
    })
  })

  it('dont dispatch if any has wrong', async () => {
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    render(<Signup />)

    userEvent.type(screen.getByPlaceholderText('Nome'), '')

    userEvent.type(screen.getByPlaceholderText('Sobrenome'), '')

    userEvent.type(screen.getByPlaceholderText('E-mail Pessoal'), '')

    fireEvent.change(screen.getByPlaceholderText('99 9 9999 9999'), {
      target: {
        value: '',
      },
    })

    userEvent.type(screen.getByPlaceholderText('Senha'), '')

    userEvent.type(screen.getByPlaceholderText('Confirmar senha'), '')

    userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }))

    await waitFor(() => {
      expect(dispatch).not.toBeCalled()
    })
  })

  it('shows "carregando.." if submit button has been pressed', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
      cb({
        user: {
          loading: true,
        },
      })
    )

    render(<Signup />)

    expect(
      screen.getByRole('button', { name: 'Carregando...' })
    ).toBeInTheDocument()
  })

  it('should be able to change input password type', async () => {
    render(<Signup />)

    userEvent.click(screen.getByTestId('password'))
    userEvent.click(screen.getByTestId('password'))
    userEvent.click(screen.getByTestId('confirmPassword'))
    userEvent.click(screen.getByTestId('confirmPassword'))

    expect(screen.getByTestId('password')).toBeInTheDocument()
    expect(screen.getByTestId('confirmPassword')).toBeInTheDocument()
  })
})
