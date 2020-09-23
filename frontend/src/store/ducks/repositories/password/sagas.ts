import { all, takeLatest, call, put } from 'redux-saga/effects'
import { api } from '../../../../service/api'
import { toast } from 'react-toastify'
import { RepositoriesTypes } from './types'
import {
  createTokenFailure,
  createTokenSuccess,
  changePasswordSuccess,
  changePasswordFailure,
} from './actions'

export function* createToken(action: any) {
  try {
    yield call(api.post, 'reset', action.payload.data)

    yield put(createTokenSuccess())

    toast.success('Verifique seu e-mail para poder trocar a senha')
  } catch (err) {
    yield put(createTokenFailure())
    toast.error(err.response.data.error)
  }
}

export function* changePassword(action: any) {
  try {
    const { code } = action.payload.data

    yield call(api.put, `reset/${code}`, action.payload.data)

    yield put(changePasswordSuccess())

    toast.success('Senha atualizada!!!')
  } catch (err) {
    yield put(changePasswordFailure())
    toast.error(err.response.data.error)
  }
}

export default all([
  takeLatest(RepositoriesTypes.CREATE_TOKEN_REQUEST, createToken),
  takeLatest(RepositoriesTypes.CHANGE_PASSWORD_REQUEST, changePassword),
])
