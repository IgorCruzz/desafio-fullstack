import {
  signInFailure,
  signInRequest,
  signInSuccess,
  signOut,
} from '../../store/ducks/repositories/signin/actions'
import signin, {
  DEFAULT_VALUES,
} from '../../store/ducks/repositories/signin/reducer'

describe('Signin (reducer)', () => {
  it('signInRequest', () => {
    const state = signin(
      DEFAULT_VALUES,
      signInRequest({
        email: 'user@gmail.com',
        password: 'password',
      })
    )

    expect(state).toStrictEqual({ token: null, signed: false, loading: true })
  })

  it('signInSuccess', () => {
    const state = signin(
      DEFAULT_VALUES,
      signInSuccess({
        token: 'token',
        user: {
          cellphone: '21999999999',
          email: 'user@gmail.com',
          id: 1,
          name: 'username',
        },
      })
    )

    expect(state).toStrictEqual({
      token: 'token',
      signed: true,
      loading: false,
    })
  })

  it('signInFailure', () => {
    const state = signin(DEFAULT_VALUES, signInFailure())

    expect(state).toStrictEqual({ signed: false, token: null, loading: false })
  })

  it('signOut', () => {
    const state = signin(DEFAULT_VALUES, signOut())

    expect(state).toStrictEqual({ signed: false, token: null, loading: false })
  })

  it('DEFAULT', () => {
    const state = signin(undefined, {})

    expect(state).toStrictEqual(DEFAULT_VALUES)
  })
})
