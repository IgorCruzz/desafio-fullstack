import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { Input, PhoneInput } from '../../components/input'
import * as unform from '@unform/core'

describe('Input', () => {
  describe('Input', () => {
    it('should able to render', () => {
      jest.spyOn(unform, 'useField').mockReturnValue({
        fieldName: 'name',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
        clearError: jest.fn(),
      })

      render(<Input name="name" placeholder="name" />)

      expect(screen.getByPlaceholderText('name')).toBeTruthy()
    })

    it('change input border color if has received an error', async () => {
      jest.spyOn(unform, 'useField').mockReturnValue({
        fieldName: 'name',
        defaultValue: '',
        error: 'error message',
        registerField: jest.fn(),
        clearError: jest.fn(),
      })

      render(<Input name="name" placeholder="name" />)

      await screen.findByTestId('error')

      expect(screen.getByTestId('error')).toBeInTheDocument()
    })
  })

  describe('PhoneInput', () => {
    it('should able to render', () => {
      jest.spyOn(unform, 'useField').mockReturnValue({
        fieldName: 'name',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
        clearError: jest.fn(),
      })

      render(<PhoneInput name="name" placeholder="99 9 9999 9999" />)

      expect(screen.getByPlaceholderText('99 9 9999 9999')).toBeTruthy()
    })

    it('change input border color if has received an error', async () => {
      jest.spyOn(unform, 'useField').mockReturnValue({
        fieldName: 'name',
        defaultValue: '',
        error: 'error message',
        registerField: jest.fn(),
        clearError: jest.fn(),
      })

      render(<PhoneInput name="name" placeholder="99 9 9999 9999" />)

      await screen.findByTestId('error')

      expect(screen.getByTestId('error')).toBeInTheDocument()
    })
  })
})
