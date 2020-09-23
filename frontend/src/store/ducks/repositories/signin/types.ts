export enum RepositoriesTypes {
  SIGNIN_REQUEST = '@signin/REQUEST',
  SIGNIN_SUCCESS = '@signin/SUCCESS',
  SIGNIN_FAILURE = '@signin/FAILURE',
  SIGNOUT = '@signin/SIGNOUT',
}

export interface ISignin {
  readonly email: string
  readonly password: string
}

export interface ISigninReducer {
  signIn: {
    loading: boolean
    signed: boolean
  }
}
