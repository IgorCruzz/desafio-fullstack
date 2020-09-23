import produce from 'immer'
import { RepositoriesTypes } from './types'
import { RepositoriesTypes as RepositoriesTypesSignin } from '../signin/types'
export const DEFAULT_VALUES = {
  loading: false,
  profile: [],
}

const user = (state = DEFAULT_VALUES, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case RepositoriesTypes.USER_CREATE_REQUEST: {
        draft.loading = true
        break
      }
      case RepositoriesTypes.USER_CREATE_FAILURE: {
        draft.loading = false
        break
      }
      case RepositoriesTypes.USER_CREATE_SUCCESS: {
        draft.loading = false
        break
      }
      case RepositoriesTypesSignin.SIGNOUT: {
        draft.profile = []
        break
      }
      case RepositoriesTypesSignin.SIGNIN_SUCCESS: {
        draft.profile = action.payload.data.user
        break
      }
      default:
    }
  })
}
export default user
