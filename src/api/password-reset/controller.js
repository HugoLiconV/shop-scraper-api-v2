import { success, notFound } from '../../services/response/'
import { sendMail } from '../../services/sendgrid'
import { PasswordReset } from '.'
import { User } from '../user'
import { resetPasswordTemplate } from '../../services/sendgrid/template'

export const create = ({ bodymen: { body: { email, link } } }, res, next) =>
   User.findOne({ email })
    .then(notFound(res))
    .then((user) => user ? PasswordReset.create({ user }) : null)
    .then((reset) => {
      if (!reset) return null
      const { user, token } = reset
      link = `${link.replace(/\/$/, '')}/${token}`
      const content = resetPasswordTemplate(link, user.name)
      return sendMail({ toEmail: email, subject: 'shop-scraper - Password Reset', content })
    })
    .then(([response]) => response ? res.status(response.statusCode).end() : null)
    .catch(next)

export const show = ({ params: { token } }, res, next) =>
  PasswordReset.findOne({ token })
    .populate('user')
    .then(notFound(res))
    .then((reset) => reset ? reset.view(true) : null)
    .then(success(res))
    .catch(next)

export const update = ({ params: { token }, bodymen: { body: { password } } }, res, next) => {
  return PasswordReset.findOne({ token })
    .populate('user')
    .then(notFound(res))
    .then((reset) => {
      if (!reset) return null
      const { user } = reset
      return user.set({ password }).save()
        .then(() => PasswordReset.remove({ user }))
        .then(() => user.view(true))
    })
    .then(success(res))
    .catch(next)
}
