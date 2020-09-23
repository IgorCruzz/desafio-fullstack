export enum RepositoriesTypes {
  CREATE_TOKEN_REQUEST = '@password/TOKEN_REQUEST',
  CREATE_TOKEN_FAILURE = '@password/TOKEN_FAILURE',
  CREATE_TOKEN_SUCCESS = '@password/TOKEN_SUCCESS',
  CHANGE_PASSWORD_REQUEST = '@password/CHANGE_PASSWORD_REQUEST',
  CHANGE_PASSWORD_FAILURE = '@password/CHANGE_PASSWORD_FAILURE',
  CHANGE_PASSWORD_SUCCESS = '@password/CHANGE_PASSWORD_SUCCESS',
}

export interface ICreateToken {
  readonly email: string
}

export interface IChangePassword {
  code: string
  email: string
  password: string
  confirmPassword: string
}

export interface IPasswordChangeReducer {
  password: {
    loading: boolean
  }
}
