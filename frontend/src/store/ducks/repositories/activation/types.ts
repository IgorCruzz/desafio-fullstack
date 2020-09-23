export enum RepositoriesTypes {
  ACTIVATE_REQUEST = '@activate/REQUEST',
  ACTIVATE_SUCCESS = '@activate/SUCCESS',
  ACTIVATE_FAILURE = '@activate/FAILURE',
}

export interface IActivation {
  token: string
}

export interface IActivationReducer {
  activation: {
    loading: boolean
  }
}
