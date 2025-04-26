import { Meta } from '~/components/Meta/Meta'
import AuthLayout from './layout'
import { createSignal } from 'solid-js'
import { router } from 'inertia-adapter-solid'

export default function Home() {
  const [values, setValues] = createSignal({
    email: '',
    password: '',
  })

  // Input onChange Handler
  function handleChange(ev: any) {
    const key = ev.target.id
    const value = ev.target.value
    setValues((values) => ({
      ...values,
      [key]: value,
    }))
  }

  // Submit form
  const formHandler = (ev: Event) => {
    ev.preventDefault()

    console.log({
      email: values().email,
      password: values().password,
    })

    router.post('/login', {
      email: values().email,
      password: values().password,
    })
  }

  return (
    <>
      <Meta title="Login" />

      <AuthLayout title="Login" subTitle="Login to your account">
        <form onSubmit={formHandler}>
          <div class="divide-y divide-gray-200">
            <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div class="relative mb-8">
                <input
                  id="email"
                  name="email"
                  type="email"
                  class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  required
                  placeholder=""
                  autocomplete="email"
                  value={values().email}
                  onChange={handleChange}
                />
                <label
                  for="email"
                  class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Email
                </label>
              </div>

              <div class="relative mb-6">
                <input
                  id="password"
                  name="password"
                  type="password"
                  class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  required
                  placeholder=""
                  autocomplete="off"
                  value={values().password}
                  onChange={handleChange}
                />
                <label
                  for="password"
                  class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Password
                </label>
              </div>

              <div class="relative text-center mt-8">
                <button class="bg-cyan-500 text-white rounded-md px-2 py-1 w-50 cursor-pointer">
                  Submit
                </button>
              </div>

              <div class="text-sm">
                Don't have an account?{' '}
                <a href="/signup" class="text-cyan-600 font-semibold">
                  Sign Up
                </a>
              </div>

              <div class="relative">
                <a href="#" class="text-cyan-600 font-semibold text-sm">
                  Forgot Password?
                </a>
              </div>
            </div>
          </div>
        </form>
      </AuthLayout>
    </>
  )
}
