import { ResetPasswordMail } from '../resetPasswordMail'
import * as sgMail from '@sendgrid/mail'

jest.mock('@sendgrid/mail')

it('AuthenticationMail', async () => {
  await ResetPasswordMail({
    email: 'email',
    name: 'username',
    token: 'token',
  })

  expect(sgMail.send).toHaveBeenCalled()
})
