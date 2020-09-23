export enum RepositoriesTypes {
  USER_CREATE_REQUEST = '@user/create_request',
  USER_CREATE_SUCCESS = '@user/create_success',
  USER_CREATE_FAILURE = '@user/create_failure',
}

export interface IUserCreate {
  readonly name: string
  readonly email: string
  readonly lastname: string
  readonly password: string
  readonly cellphone: string
}

export interface IUserReducer {
  user: {
    loading: boolean
    profile: {
      id: number
      name: string
      email: string
      cellphone: string
    }
  }
}
