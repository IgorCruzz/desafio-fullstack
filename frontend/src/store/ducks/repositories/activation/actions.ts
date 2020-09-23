import { IActivation, RepositoriesTypes } from './types'

export const activationRequest = (data: IActivation) => {
  return {
    type: RepositoriesTypes.ACTIVATE_REQUEST,
    payload: {
      data,
    },
  }
}

export const activationFailure = () => {
  return {
    type: RepositoriesTypes.ACTIVATE_FAILURE,
  }
}

export const activationSuccess = () => {
  return {
    type: RepositoriesTypes.ACTIVATE_SUCCESS,
  }
}
