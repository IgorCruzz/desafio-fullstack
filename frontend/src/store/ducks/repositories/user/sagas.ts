import { all, takeLatest, call, put } from 'redux-saga/effects'
import { api } from '../../../../service/api'
import { RepositoriesTypes } from './types'
import { UserCreateFailure, UserCreateSuccess } from './actions'
import { toast } from 'react-toastify'

export function* userCreate(action: any) {
  try {
    yield call(api.post, 'auth', action.payload.data)

    yield put(UserCreateSuccess())

    window.location.href = '/message'
  } catch (err) {
    toast.error(err.response.data.error)
    yield put(UserCreateFailure())
  }
}

export default all([
  takeLatest(RepositoriesTypes.USER_CREATE_REQUEST, userCreate),
])
