import MockAdapter from 'axios-mock-adapter'
import { runSaga } from 'redux-saga'
import { api } from '../../service/api'
import { toast } from 'react-toastify'
import { changePassword } from '../../store/ducks/repositories/password/sagas'
import {
  changePasswordFailure,
  changePasswordSuccess,
} from '../../store/ducks/repositories/password/actions'

const apiMock = new MockAdapter(api)

describe('Changepassword (saga)', () => {
  it('should be able to change password', async () => {
    const dispatch = jest.fn()
    const toastMock = jest.spyOn(toast, 'success')

    apiMock.onPut('reset/CODE').reply(201)

    await runSaga({ dispatch }, changePassword, {
      payload: {
        data: {
          code: 'CODE',
          email: 'user@gmail.com',
          password: 'password',
          confirmPassword: 'password',
        },
      },
    }).toPromise()

    expect(dispatch).toHaveBeenCalledWith(changePasswordSuccess())
    expect(toastMock).toHaveBeenCalledWith('Senha atualizada!!!')
  })

  it('should dispatch "createTokenFailure" is has any wrong', async () => {
    try {
      const dispatch = jest.fn()

      apiMock.onPut('reset/CODE').reply(400, { error: 'error message' })

      await runSaga({ dispatch }, changePassword, {
        payload: {
          data: {
            code: 'CODE',
            email: 'user@gmail.com',
            password: 'password',
            confirmPassword: 'password',
          },
        },
      }).toPromise()
    } catch (err) {
      const toastMock = jest.spyOn(toast, 'error')
      expect(changePasswordFailure).toHaveBeenCalled()
      expect(toastMock).toHaveBeenCalledWith(err.response.data.error)
    }
  })
})
