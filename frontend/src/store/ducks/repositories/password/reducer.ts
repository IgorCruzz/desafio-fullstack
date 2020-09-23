import produce from 'immer'
import { RepositoriesTypes } from './types'

export const DEFAULT_VALUES = {
  loading: false,
}

const password = (state = DEFAULT_VALUES, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case RepositoriesTypes.CREATE_TOKEN_REQUEST: {
        draft.loading = true
        break
      }
      case RepositoriesTypes.CREATE_TOKEN_SUCCESS: {
        draft.loading = false
        break
      }
      case RepositoriesTypes.CREATE_TOKEN_FAILURE: {
        draft.loading = false
        break
      }
      case RepositoriesTypes.CHANGE_PASSWORD_REQUEST: {
        draft.loading = true
        break
      }
      case RepositoriesTypes.CHANGE_PASSWORD_FAILURE: {
        draft.loading = false
        break
      }
      case RepositoriesTypes.CHANGE_PASSWORD_SUCCESS: {
        draft.loading = false
        break
      }

      default:
    }
  })
}

export default password
