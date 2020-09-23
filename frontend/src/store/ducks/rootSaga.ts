import { all } from 'redux-saga/effects'

import user from './repositories/user/sagas'
import signin from './repositories/signin/sagas'
import createToken from './repositories/password/sagas'
import activation from './repositories/activation/sagas'

export default function* rootSaga() {
  return yield all({ user, signin, createToken, activation })
}
