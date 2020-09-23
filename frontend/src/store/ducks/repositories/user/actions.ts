import { RepositoriesTypes, IUserCreate } from './types'

export const UserCreateRequest = (data: IUserCreate) => {
  return {
    type: RepositoriesTypes.USER_CREATE_REQUEST,
    payload: { data },
  }
}

export const UserCreateSuccess = () => {
  return {
    type: RepositoriesTypes.USER_CREATE_SUCCESS,
  }
}

export const UserCreateFailure = () => {
  return {
    type: RepositoriesTypes.USER_CREATE_FAILURE,
  }
}
