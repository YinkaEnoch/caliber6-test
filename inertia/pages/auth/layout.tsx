import type { JSXElement } from 'solid-js'

export default function AuthLayout(props: {
  children: JSXElement
  title: string
  subTitle?: string
}) {
  return (
    <>
      {/* Form Body */}
      <section class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div class="relative py-3 sm:max-w-xl sm:mx-auto">
          <div class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div class="max-w-md mx-auto">
              <h1 class="text-2xl font-semibold text-center">{props.title}</h1>
              <p class="text-center">{props.subTitle}</p>
              {props.children}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
