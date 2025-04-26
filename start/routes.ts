/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

router.get('/login', [AuthController, 'loginPage']).as('loginPage')
router.post('/login', [AuthController, 'loginPost'])

router.get('/logout', [AuthController, 'logout'])

router
  .get('/signup', [AuthController, 'signUpPage'])
  .as('signupPage')
  .middleware([middleware.auth()])

router.post('/signup', [AuthController, 'signUpPost'])

router
  .get('/dashboard', [DashboardController, 'DashboardPage'])
  .as('dashboardPage')
  .middleware([middleware.auth()])
