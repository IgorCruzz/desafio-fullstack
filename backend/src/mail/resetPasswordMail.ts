import 'dotenv/config'
import * as sgMail from '@sendgrid/mail'

export const ResetPasswordMail = async (data: {
  name: string
  email: string
  token: string
}) => {
  const { name, email, token } = data

  sgMail.setApiKey(process.env.EMAIL)

  const msg = {
    to: email,
    from: 'igorcruz.dev@gmail.com',
    subject: 'Alterar senha',
    html: `<p>Olá, <strong>${name}</strong></p> <br />
           <p>Entre nesse link para alterar sua senha.<br />
           <a href=${process.env.URL}/changePassword/${token}>**Clique aqui para alterar sua senha**</a>
           </p>`,
  }

  await sgMail.send(msg)
}
