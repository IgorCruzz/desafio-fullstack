import { ISignin, RepositoriesTypes } from './types'

export const signInRequest = (data: ISignin) => {
  return {
    type: RepositoriesTypes.SIGNIN_REQUEST,
    payload: { data },
  }
}

export const signInSuccess = (data: {
  token: string
  user: { id: number; name: string; cellphone: string; email: string }
}) => {
  return {
    type: RepositoriesTypes.SIGNIN_SUCCESS,
    payload: { data },
  }
}

export const signInFailure = () => {
  return {
    type: RepositoriesTypes.SIGNIN_FAILURE,
  }
}

export const signOut = () => {
  return {
    type: RepositoriesTypes.SIGNOUT,
  }
}
