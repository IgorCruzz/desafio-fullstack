import { RepositoriesTypes, ICreateToken, IChangePassword } from './types'

export const createTokenRequest = (data: ICreateToken) => {
  return {
    type: RepositoriesTypes.CREATE_TOKEN_REQUEST,
    payload: { data },
  }
}

export const createTokenFailure = () => {
  return {
    type: RepositoriesTypes.CREATE_TOKEN_FAILURE,
  }
}

export const createTokenSuccess = () => {
  return {
    type: RepositoriesTypes.CREATE_TOKEN_SUCCESS,
  }
}

export const changePasswordRequest = (data: IChangePassword) => {
  return {
    type: RepositoriesTypes.CHANGE_PASSWORD_REQUEST,
    payload: { data },
  }
}

export const changePasswordFailure = () => {
  return {
    type: RepositoriesTypes.CHANGE_PASSWORD_FAILURE,
  }
}

export const changePasswordSuccess = () => {
  return {
    type: RepositoriesTypes.CHANGE_PASSWORD_SUCCESS,
  }
}
