import { Meta } from '~/components/Meta/Meta'
import AuthLayout from './layout'
import { createSignal } from 'solid-js'
import { router } from 'inertia-adapter-solid'

export default function SignUp() {
  const [errorMessage, setErrorMessage] = createSignal('')

  // Intercept for error messages
  router.on('invalid', (ev) => {
    ev.preventDefault()
    setErrorMessage(ev.detail.response.data.error)
  })

  const [values, setValues] = createSignal({
    fullName: '',
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
      fullName: values().fullName,
      email: values().email,
      password: values().password,
    })

    router.post('/signup', {
      fullName: values().fullName,
      email: values().email,
      password: values().password,
    })
  }

  return (
    <>
      <Meta title="Sign Up" />

      <AuthLayout title="Sign Up" subTitle="Let's create your new account">
        <p class="text-red-500 mt-2 text-center">{errorMessage()}</p>

        <form onSubmit={formHandler}>
          <div class="divide-y divide-gray-200">
            <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div class="relative mb-8">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  required
                  placeholder=""
                  autocomplete="name"
                  value={values().fullName}
                  onChange={handleChange}
                />
                <label
                  for="fullName"
                  class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Full Name <span class="text-red-500">*</span>
                </label>
              </div>

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
                  Email <span class="text-red-500">*</span>
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
                  Password <span class="text-red-500">*</span>
                </label>
              </div>

              <div class="text-center mt-8">
                <button class="bg-cyan-500 text-white rounded-md px-2 py-1 w-50 cursor-pointer">
                  Submit
                </button>
              </div>

              <div class="text-sm">
                Already have an account?{' '}
                <a href="/login" class="text-cyan-600 font-semibold">
                  Login
                </a>
              </div>
            </div>
          </div>
        </form>
      </AuthLayout>
    </>
  )
}
