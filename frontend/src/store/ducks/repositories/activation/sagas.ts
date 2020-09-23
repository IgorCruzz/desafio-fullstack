import { all, takeLatest, call, put } from 'redux-saga/effects'
import { RepositoriesTypes } from './types'
import { api } from '../../../../service/api'
import { toast } from 'react-toastify'
import { activationFailure, activationSuccess } from './actions'

export function* activateAccount(action: any) {
  try {
    const { token } = action.payload.data

    yield call(api.put, `auth/${token}`)

    yield put(activationSuccess())

    toast.success('Conta ativada!!!')
  } catch (err) {
    toast.error(err.response.data.error)
    yield put(activationFailure())
  }
}

export default all([
  takeLatest(RepositoriesTypes.ACTIVATE_REQUEST, activateAccount),
])
