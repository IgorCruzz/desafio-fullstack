import {
  createTokenFailure,
  createTokenRequest,
  createTokenSuccess,
  changePasswordFailure,
  changePasswordRequest,
  changePasswordSuccess,
} from '../../store/ducks/repositories/password/actions'
import password, {
  DEFAULT_VALUES,
} from '../../store/ducks/repositories/password/reducer'

describe('Password (reducer)', () => {
  it('createTokenRequest', () => {
    const state = password(
      DEFAULT_VALUES,
      createTokenRequest({
        email: 'email@gmail.com',
      })
    )

    expect(state).toStrictEqual({ loading: true })
  })

  it('createTokenSuccess', () => {
    const state = password(DEFAULT_VALUES, createTokenSuccess())

    expect(state).toStrictEqual({ loading: false })
  })

  it('createTokenFailure', () => {
    const state = password(DEFAULT_VALUES, createTokenFailure())

    expect(state).toStrictEqual({ loading: false })
  })

  it('changePasswordRequest', () => {
    const state = password(
      DEFAULT_VALUES,
      changePasswordRequest({
        code: 'code',
        email: 'email@gmail.com',
        password: 'password',
        confirmPassword: 'password',
      })
    )

    expect(state).toStrictEqual({ loading: true })
  })

  it('changePasswordSuccess', () => {
    const state = password(DEFAULT_VALUES, changePasswordSuccess())

    expect(state).toStrictEqual({ loading: false })
  })

  it('changePasswordFailure', () => {
    const state = password(DEFAULT_VALUES, changePasswordFailure())

    expect(state).toStrictEqual({ loading: false })
  })

  it('DEFAULT', () => {
    const state = password(undefined, {})

    expect(state).toStrictEqual(DEFAULT_VALUES)
  })
})
