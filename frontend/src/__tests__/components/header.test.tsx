import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '../../components/header'
import React from 'react'
import * as redux from 'react-redux'

jest.mock('react-redux')

describe('Header', () => {
  it('should be able to render', () => {
    expect(render(<Header />)).toBeTruthy()
  })

  it('should be able to logout', () => {
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    render(<Header />)

    userEvent.click(screen.getByRole('button', { name: 'Sair' }))

    expect(dispatch).toBeCalled()
  })
})
