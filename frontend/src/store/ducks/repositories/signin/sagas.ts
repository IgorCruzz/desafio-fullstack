import { all, takeLatest, call, put } from 'redux-saga/effects'
import { RepositoriesTypes } from './types'
import { api } from '../../../../service/api'
import { toast } from 'react-toastify'
import { signInFailure, signInSuccess } from './actions'

export function* signIn(action: any) {
  try {
    const res = yield call(api.post, 'session', action.payload.data)

    const { token, ...user } = res.data

    api.defaults.headers.Authorization = `Bearer ${token}`

    yield put(
      signInSuccess({
        token,
        user: user,
      })
    )

    toast.success('Seja bem-vindo!!!')
  } catch (err) {
    yield put(signInFailure())
    toast.error(err.response.data.error)
  }
}

export function setToken(action: any) {
  if (!action.payload) return

  const { token } = action.payload.signIn
  /* istanbul ignore else */
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest(RepositoriesTypes.SIGNIN_REQUEST, signIn),
])
