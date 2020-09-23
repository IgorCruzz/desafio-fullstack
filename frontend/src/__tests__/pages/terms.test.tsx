import { render } from '@testing-library/react'
import Terms from '../../pages/terms'
import React from 'react'

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  }
})

describe('Terms', () => {
  it('should be able to render', () => {
    expect(render(<Terms />)).toBeTruthy()
  })
})
