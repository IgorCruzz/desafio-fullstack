import { render } from '@testing-library/react'
import Dashboard from '../../pages/dashboard'
import React from 'react'

describe('Dashboard', () => {
  it('should be able to render', () => {
    expect(render(<Dashboard />)).toBeTruthy()
  })
})
