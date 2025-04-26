import Logo from '~/assets/images/logo.webp'
import { Title, Link, MetaProvider } from '@solidjs/meta'
import type { JSXElement } from 'solid-js'

export function Meta(props: { title?: string; children?: JSXElement }) {
  const title = props.title ? props.title : 'EMCO'

  return (
    <MetaProvider>
      <Title>{title}</Title>
      <Link rel="icon" type="image/x-icon" href={Logo} />
      {props.children}
    </MetaProvider>
  )
}
