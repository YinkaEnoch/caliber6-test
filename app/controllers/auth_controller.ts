import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async loginPage(ctx: HttpContext) {
    const isAuthenticated = ctx.auth.isAuthenticated
    console.log({ isAuthenticated, page: 'login' })

    if (isAuthenticated) {
      return ctx.response.redirect().toRoute('dashboardPage')
    }

    return ctx.inertia.render('auth/login')
  }

  async loginPost(ctx: HttpContext) {
    const { email, password } = ctx.request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    await ctx.auth.use('web').login(user)

    return ctx.response.redirect().toRoute('dashboardPage')
  }

  async signUpPage(ctx: HttpContext) {
    return ctx.inertia.render('auth/sign_up')
  }

  async signUpPost(ctx: HttpContext) {
    const { fullName, email, password } = ctx.request.only(['fullName', 'email', 'password'])

    try {
      console.log({ fullName, email, password })

      await User.create({ fullName, email, password })

      return ctx.response.redirect().toRoute('loginPage')
    } catch (error) {
      let message = error ? error?.message : error

      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        message = `${email} already exists`
      }

      return ctx.response.status(500).send({ error: message })
    }
  }

  async logout(ctx: HttpContext) {
    await ctx.auth.use('web').logout()

    ctx.response.redirect('/login')
  }
}
