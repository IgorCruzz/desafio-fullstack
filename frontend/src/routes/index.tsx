import React from 'react'
import { Switch } from 'react-router-dom'
import Route from './routes'

import Signup from '../pages/signup'
import Signin from '../pages/signin'
import CreateToken from '../pages/password/createToken'
import ChangePassword from '../pages/password/changePassword'
import Message from '../pages/message'
import Activation from '../pages/activation'
import Dashboard from '../pages/dashboard'
import Terms from '../pages/terms'

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="/createToken" component={CreateToken} />
      <Route path="/changePassword/:code" component={ChangePassword} />
      <Route path="/message" component={Message} />
      <Route path="/activation/:token" component={Activation} />
      <Route path="/terms" component={Terms} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  )
}
