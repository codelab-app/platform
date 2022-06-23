import { initializeStore } from '@codelab/frontend/model/infra/mobx'
import { Renderer } from '@codelab/frontend/modules/renderer'
import { createMobxState } from '@codelab/frontend/modules/store'
import { useStore } from '@codelab/frontend/presenter/container'
import {
  extractErrorMessage,
  useStatefulExecutor,
} from '@codelab/frontend/shared/utils'
import { Alert, Spin } from 'antd'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

type PageProps = {
  user: string
  app: string
  page: string
}

/**
 * Routes will be /user/codelab/demo/home
 *
 * /user is only required so we can use pathname.startsWith('/user')
 *
 * Custom domain will be able to hook up to this
 *
 */
const Index = (props: PageProps) => {
  const {
    pageService,
    appService,
    typeService,
    componentService,
    storeService,
    appRenderService,
  } = useStore()

  const router = useRouter()

  console.log(router)

  // console.log('props', props)

  const { user: userSlug, app: appSlug, page: pageSlug } = router.query

  console.log(appSlug, pageSlug)

  const [, { isLoading, error, data, isDone }] = useStatefulExecutor(
    async () => {
      const [app] = await appService.getAll({
        slug: appSlug as string,
      })

      console.log('app', app)

      const [page] = await pageService.getAll({
        slug: pageSlug as string,
      })

      const storeTree = app?.store?.id
        ? await storeService.getOne(app.store.id)
        : null

      // components are needed to build pageElementTree
      // therefore they must be loaded first
      // This requires a current userId to work
      // await componentService.loadComponentTrees()

      /**
       * Construct the ElementTree's for
       *
       * - page tree
       * - provider tree
       */
      const [pageElementTree, providerTree, types] = await Promise.all([
        page.initTree(page.rootElement.id),
        app.initTree(app.rootElement.id),
        typeService.getAll(),
      ])

      // initialize renderer
      const renderer = await appRenderService.addRenderer(
        page.id,
        pageElementTree,
        null,
        createMobxState(storeTree, [app], [page], router),
      )

      return {
        page,
        pageElementTree,
        // providerTree,
        // storeTree,
        renderer,
      }
    },
    { executeOnMount: true },
  )

  return (
    <>
      <Head>
        <title>{data?.page?.name}</title>
      </Head>
      {error && <Alert message={extractErrorMessage(error)} type="error" />}
      {isLoading && <Spin />}
      {isDone && data?.pageElementTree && data.renderer ? (
        <Renderer renderRoot={data.renderer.renderRoot.bind(data.renderer)} />
      ) : null}
    </>
  )
}

export default Index

export const getStaticPaths: GetStaticPaths = async (context) => {
  console.log('getStaticPaths', `env ${process.env.NODE_ENV}`)

  const isProd = process.env.NODE_ENV === 'production'

  if (isProd) {
    return { paths: [], fallback: 'blocking' }
  }

  const { userService } = initializeStore()
  await userService.loadUsers()

  const paths = [...userService.users.values()]
    .map((user) => {
      console.log('apps', [...user.apps.values()])

      return [...user.apps.values()]
        .map((app) => {
          return app.current.pages.map((page) => {
            return {
              params: {
                user: user.username,
                app: app.current.name,
                page: page.current.name,
              },
            }
          })
        })
        .flat()
    })
    .flat()

  console.log('paths', paths)

  return {
    paths,
    // fallback true allows sites to be generated using ISR
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  console.log('getStaticProps', context)

  return {
    props: {},
    /**
     * Getting odd error if we enable this
     *
     * rror: tweak can only work over models, observable objects/arrays, or primitives, but got function sub() { [native code] }
     *
     * Instead, we access query from router instead
     */
    // props: {
    //   ...context.params,
    // },
    /**
     * https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
     */
    revalidate: 10,
  }
}
