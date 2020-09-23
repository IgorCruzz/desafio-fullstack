import MockAdapter from 'axios-mock-adapter'
import {
  UserCreateFailure,
  UserCreateSuccess,
} from '../../store/ducks/repositories/user/actions'
import { runSaga } from 'redux-saga'
import { userCreate } from '../../store/ducks/repositories/user/sagas'
import { api } from '../../service/api'
import { toast } from 'react-toastify'

const apiMock = new MockAdapter(api)

describe('User (saga)', () => {
  it('should be able to register an user', async () => {
    const dispatch = jest.fn()

    apiMock.onPost('auth').reply(201)

    global.window = Object.create(window)

    Object.defineProperty(window, 'location', {
      value: {
        href: 'http://localhost/',
      },
      writable: true,
    })

    await runSaga({ dispatch }, userCreate, {
      payload: {
        data: {
          name: 'username',
          lastname: 'lastname',
          email: 'user@gmail.com',
          password: 'password',
          cellphone: '21999999999',
        },
      },
    }).toPromise()

    expect(dispatch).toHaveBeenCalledWith(UserCreateSuccess())
  })

  it('throws a toast message if any has been passed wrong', async () => {
    try {
      const dispatch = jest.fn()

      apiMock.onPost('auth').reply(400, { error: 'error message' })

      await runSaga({ dispatch }, userCreate, {
        payload: {
          data: {
            name: 'username',
            lastname: 'lastname',
            email: 'user@gmail.com',
            password: 'password',
            cellphone: '21999999999',
          },
        },
      }).toPromise()
    } catch (err) {
      const toastMock = jest
        .spyOn(toast, 'error')
        .mockReturnValue(err.response.data.error)
      expect(UserCreateFailure).toHaveBeenCalled()
      expect(toastMock).toHaveBeenCalled()
    }
  })
})
