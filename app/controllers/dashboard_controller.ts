import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async DashboardPage(ctx: HttpContext) {
    const { fullName, email } = ctx.auth.getUserOrFail()

    ctx.inertia.share({ fullName, email })
    return ctx.inertia.render('dashboard')
  }
}
