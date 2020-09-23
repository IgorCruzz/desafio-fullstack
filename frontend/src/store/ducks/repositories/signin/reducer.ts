import produce from 'immer'
import { RepositoriesTypes } from './types'

export const DEFAULT_VALUES = {
  signed: false,
  loading: false,
  token: null,
}

const signIn = (state = DEFAULT_VALUES, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case RepositoriesTypes.SIGNIN_REQUEST: {
        draft.loading = true
        break
      }
      case RepositoriesTypes.SIGNIN_FAILURE: {
        draft.loading = false
        break
      }
      case RepositoriesTypes.SIGNIN_SUCCESS: {
        draft.loading = false
        draft.signed = true
        draft.token = action.payload.data.token
        break
      }
      case RepositoriesTypes.SIGNOUT: {
        draft.signed = false
        draft.token = null
        break
      }
      default:
    }
  })
}

export default signIn
