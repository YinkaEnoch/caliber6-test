import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async loginPage(ctx: HttpContext) {
    // Check if user is already logged in
    await ctx.auth.check()

    const isAuthenticated = ctx.auth.isAuthenticated

    if (isAuthenticated) {
      return ctx.response.redirect().toRoute('dashboardPage')
    }

    return ctx.inertia.render('auth/login')
  }

  async loginPost(ctx: HttpContext) {
    try {
      const { email, password } = ctx.request.only(['email', 'password'])

      const user = await User.verifyCredentials(email, password)

      await ctx.auth.use('web').login(user)

      return ctx.response.redirect().toRoute('dashboardPage')
    } catch (error) {
      if (error && error.code && error.code === 'E_INVALID_CREDENTIALS') {
        return ctx.response.status(400).send({ error: 'Wrong Email/Password combination' })
      }
    }
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
