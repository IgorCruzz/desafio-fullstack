import MockAdapter from 'axios-mock-adapter'
import { createToken } from '../../store/ducks/repositories/password/sagas'
import {
  createTokenFailure,
  createTokenSuccess,
} from '../../store/ducks/repositories/password/actions'
import { runSaga } from 'redux-saga'
import { api } from '../../service/api'
import { toast } from 'react-toastify'

const apiMock = new MockAdapter(api)

describe('Createtoken (saga)', () => {
  it('should be able to create token', async () => {
    const dispatch = jest.fn()
    const toastMock = jest.spyOn(toast, 'success')

    apiMock.onPost('reset').reply(201)

    await runSaga({ dispatch }, createToken, {
      payload: {
        data: {
          email: 'user@gmail.com',
        },
      },
    }).toPromise()

    expect(dispatch).toHaveBeenCalledWith(createTokenSuccess())
    expect(toastMock).toHaveBeenCalledWith(
      'Verifique seu e-mail para poder trocar a senha'
    )
  })

  it('should dispatch "createTokenFailure" is has any wrong', async () => {
    try {
      const dispatch = jest.fn()

      apiMock.onPost('reset').reply(400, { error: 'error message' })

      await runSaga({ dispatch }, createToken, {
        payload: {
          data: {
            email: 'user@gmail.com',
          },
        },
      }).toPromise()
    } catch (err) {
      const toastMock = jest.spyOn(toast, 'error')
      expect(createTokenFailure).toHaveBeenCalled()
      expect(toastMock).toHaveBeenCalledWith(err.response.data.error)
    }
  })
})
