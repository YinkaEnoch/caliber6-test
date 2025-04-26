import { Meta } from '~/components/Meta/Meta'
import { Link, usePage } from 'inertia-adapter-solid'

export default function Dashboard() {
  const props = usePage().props

  const fullName = props.fullName as string
  const email = props.email as string

  let name = fullName
  const emailDomain = email.split('@')[1].trim()

  if (!name) {
    name = email.split('@')[0].trim()
  }

  return (
    <>
      <Meta title="Dashboard" />

      <section class="p-4 shadow-sm flex">
        <span class="capitalize">Welcome, {name}</span>
        <Link href="/logout" class="text-sky-500 ml-auto">
          Logout
        </Link>
      </section>

      <section class="mt-8 px-2">
        <section class="max-w-sm m-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
          <p class="py-2">
            <strong>Name: </strong>
            <span class="capitalize">{name}</span>
          </p>
          <p class="py-2">
            <strong>Email: </strong>
            <span>{email}</span>
          </p>
          <p class="py-2">
            <strong>Email Domain: </strong>
            <span>{emailDomain}</span>
          </p>
        </section>
      </section>
    </>
  )
}
