import MockAdapter from 'axios-mock-adapter'
import { api } from '../../service/api'
import { toast } from 'react-toastify'
import { runSaga } from 'redux-saga'
import {
  signInFailure,
  signInSuccess,
} from '../../store/ducks/repositories/signin/actions'
import { signIn, setToken } from '../../store/ducks/repositories/signin/sagas'

const apiMock = new MockAdapter(api)

describe('Signin (Sagas)', () => {
  it('should be able to signin', async () => {
    const dispatch = jest.fn()
    const toastMock = jest.spyOn(toast, 'success')

    apiMock.onPost('session').reply(201, {
      id: 1,
      name: 'username',
      email: 'user@gmail.com',
      cellphone: '21999999999',
      token: 'token',
    })

    await runSaga({ dispatch }, signIn, {
      payload: {
        data: {
          email: 'user@gmail.com',
          password: 'password',
        },
      },
    }).toPromise()

    expect(toastMock).toHaveBeenCalledWith('Seja bem-vindo!!!')
    expect(dispatch).toHaveBeenCalledWith(
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
  })

  it('throws an toast Message if anything has wrong', async () => {
    try {
      const dispatch = jest.fn()

      apiMock.onPost('session').reply(400, { error: 'error message ' })

      await runSaga({ dispatch }, signIn, {
        payload: {
          data: {
            email: 'user@gmail.com',
            password: 'password',
          },
        },
      }).toPromise()
    } catch (err) {
      const toastMock = jest.spyOn(toast, 'error')
      expect(toastMock).toHaveBeenCalledWith(err.response.data.error)
      expect(signInFailure).toHaveBeenCalled()
    }
  })

  it('should be to persit the token', async () => {
    setToken({
      payload: {
        signIn: {
          token: 'token',
          user: {
            cellphone: '21999999999',
            email: 'user@gmail.com',
            id: 1,
            name: 'username',
          },
        },
      },
    })

    expect(api.defaults.headers.Authorization).toBe('Bearer token')
  })

  it('return nothing if payload has not passed', () => {
    expect(setToken({})).toEqual(undefined)
  })
})
