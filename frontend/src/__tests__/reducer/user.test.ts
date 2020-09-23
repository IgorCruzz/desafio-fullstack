import {
  UserCreateFailure,
  UserCreateRequest,
  UserCreateSuccess,
} from '../../store/ducks/repositories/user/actions'
import user, {
  DEFAULT_VALUES,
} from '../../store/ducks/repositories/user/reducer'
import {
  signOut,
  signInSuccess,
} from '../../store/ducks/repositories/signin/actions'

describe('User (REDUCER)', () => {
  it('UserCreateRequest', () => {
    const state = user(
      DEFAULT_VALUES,
      UserCreateRequest({
        name: 'username',
        lastname: 'lastname',
        cellphone: '21999999999',
        email: 'user@gmail.com',
        password: 'password',
      })
    )

    expect(state).toStrictEqual({ loading: true, profile: [] })
  })

  it('UserCreateSuccess', () => {
    const state = user(DEFAULT_VALUES, UserCreateSuccess())

    expect(state).toStrictEqual({ loading: false, profile: [] })
  })

  it('UserCreateFailure', () => {
    const state = user(DEFAULT_VALUES, UserCreateFailure())

    expect(state).toStrictEqual({ loading: false, profile: [] })
  })

  it('DEFAULT', () => {
    const state = user(undefined, {})

    expect(state).toStrictEqual(DEFAULT_VALUES)
  })

  it('signOut', () => {
    const state = user(DEFAULT_VALUES, signOut())

    expect(state).toStrictEqual({ loading: false, profile: [] })
  })

  it('signInSuccess', () => {
    const state = user(
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
      loading: false,
      profile: {
        cellphone: '21999999999',
        email: 'user@gmail.com',
        id: 1,
        name: 'username',
      },
    })
  })
})
