import MockAdapter from 'axios-mock-adapter'
import { runSaga } from 'redux-saga'
import { api } from '../../service/api'
import { toast } from 'react-toastify'
import { activateAccount } from '../../store/ducks/repositories/activation/sagas'
import {
  activationFailure,
  activationSuccess,
} from '../../store/ducks/repositories/activation/actions'

const apiMock = new MockAdapter(api)

describe('Activaton (Saga)', () => {
  it('should be able to activate an account', async () => {
    const dispatch = jest.fn()
    const toastMock = jest.spyOn(toast, 'success')

    apiMock.onPut('auth/TOKEN').reply(201)

    await runSaga({ dispatch }, activateAccount, {
      payload: {
        data: {
          token: 'TOKEN',
        },
      },
    }).toPromise()

    expect(toastMock).toHaveBeenCalledWith('Conta ativada!!!')
    expect(dispatch).toHaveBeenCalledWith(activationSuccess())
  })

  it('dispatch "activationFailure" if any has wrong', async () => {
    try {
      const dispatch = jest.fn()

      apiMock.onPut('auth/TOKEN').reply(400, { error: 'error message' })

      await runSaga({ dispatch }, activateAccount, {
        payload: {
          data: {
            token: 'TOKEN',
          },
        },
      }).toPromise()
    } catch (err) {
      const toastMock = jest.spyOn(toast, 'error')

      expect(toastMock).toHaveBeenCalledWith(err.response.data.error)
      expect(activationFailure).toHaveBeenCalled()
    }
  })
})
