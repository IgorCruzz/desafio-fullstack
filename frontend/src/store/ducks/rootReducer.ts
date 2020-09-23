import { combineReducers } from 'redux'

import user from './repositories/user/reducer'
import signIn from './repositories/signin/reducer'
import password from './repositories/password/reducer'
import activation from './repositories/activation/reducer'

export default combineReducers({ user, signIn, password, activation })
