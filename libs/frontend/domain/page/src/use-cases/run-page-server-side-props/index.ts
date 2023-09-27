import { auth0Instance } from '@codelab/frontend/infra/auth0'
import { getPageServerSideProps } from './page-server-side-props.api'
import { GetServerSideProps } from 'next'

export const runPageGetServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await auth0Instance().getSession(ctx.req, ctx.res)
  const fallback = { props: {} }
  if (!ctx.params || !session?.user) {
    return fallback
  }

  const appSlug = ctx.params.appSlug as string
  const pageSlug = ctx.params.pageSlug as string
  const user = { id: session.user.id }

  const page = await getPageServerSideProps(appSlug, pageSlug, user)
  const code = page?.getServerSideProps

  if (!code) {
    return fallback
  }

  try {
    return new Function(code)(ctx)
  } catch (e) {
    return fallback
  }
}
