import { AuthenticationMail } from '../authenticationMail'
import * as sgMail from '@sendgrid/mail'

jest.mock('@sendgrid/mail')

it('AuthenticationMail', async () => {
  await AuthenticationMail({
    email: 'email',
    name: 'username',
    token: 'token',
  })

  expect(sgMail.send).toHaveBeenCalled()
})
