import produce from 'immer'
import { RepositoriesTypes } from './types'

export const DEFAULT_VALUES = {
  loading: false,
}

const activation = (state = DEFAULT_VALUES, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case RepositoriesTypes.ACTIVATE_REQUEST: {
        draft.loading = true
        break
      }
      case RepositoriesTypes.ACTIVATE_SUCCESS: {
        draft.loading = false
        break
      }
      default:
    }
  })
}

export default activation
