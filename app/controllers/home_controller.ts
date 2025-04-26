import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  async HomePage(ctx: HttpContext) {
    const isAuthenticated = ctx.auth.isAuthenticated

    if (isAuthenticated) {
      return ctx.response.redirect().toRoute('dashboardPage')
    }

    return ctx.response.redirect().toRoute('loginPage')
  }
}
