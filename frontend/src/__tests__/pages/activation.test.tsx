import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Activation from '../../pages/activation'
import React from 'react'
import * as redux from 'react-redux'

jest.mock('react-redux')

jest.mock('react-router-dom', () => {
  return {
    useParams: () => {
      return {
        token: 'TOKEN',
      }
    },
    Link: ({ children }: { children: React.ReactNode }) => children,
  }
})

describe('Activaton', () => {
  it('should be able to render', () => {
    expect(render(<Activation />)).toBeTruthy()
  })

  it('should be able to activate account', async () => {
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    render(<Activation />)

    userEvent.click(screen.getByRole('button', { name: 'Ativar conta' }))

    expect(dispatch).toBeCalled()
  })

  it('shows "carregando.." if submit button has been pressed', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
      cb({
        activation: {
          loading: true,
        },
      })
    )

    render(<Activation />)

    expect(
      screen.getByRole('button', { name: 'Carregando...' })
    ).toBeInTheDocument()
  })
})
