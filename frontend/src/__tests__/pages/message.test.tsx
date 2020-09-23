import { render } from '@testing-library/react'
import Message from '../../pages/message'
import React from 'react'

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  }
})

describe('Message', () => {
  it('should be able to render', () => {
    expect(render(<Message />)).toBeTruthy()
  })
})
