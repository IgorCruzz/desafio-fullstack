import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateToken from '../../pages/password/createToken'
import React from 'react'
import * as redux from 'react-redux'

jest.mock('react-redux')

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  }
})

describe('CreateToken', () => {
  it('should be able to render', () => {
    expect(render(<CreateToken />)).toBeTruthy()
  })

  it('should be able to create a token', async () => {
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    render(<CreateToken />)

    userEvent.type(screen.getByPlaceholderText('E-mail'), 'email@gmail.com')

    userEvent.click(screen.getByRole('button', { name: 'Enviar código' }))

    await waitFor(() => {
      expect(dispatch).toBeCalled()
    })
  })

  it('dont dispatch if has any wrong', async () => {
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    render(<CreateToken />)

    userEvent.type(screen.getByPlaceholderText('E-mail'), '')

    userEvent.click(screen.getByRole('button', { name: 'Enviar código' }))

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

    render(<CreateToken />)

    expect(
      screen.getByRole('button', { name: 'Carregando...' })
    ).toBeInTheDocument()
  })
})
