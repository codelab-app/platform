import { initializeStore } from '@codelab/frontend/model/infra/mobx'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

/**
 * Routes will be /user/codelab/demo/home
 *
 * /user is only required so we can use pathname.startsWith('/user')
 *
 * Custom domain will be able to hook up to this
 */
const Index = (props: any) => {
  const router = useRouter()

  console.log(router)

  return (
    <>
      <h1>Hello</h1>
      <span>{JSON.stringify(router.query)}</span>
    </>
  )
}

export default Index

export const getStaticPaths: GetStaticPaths = async (context) => {
  console.log('getStaticPaths')

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

export const getStaticProps = async () => {
  console.log('getStaticProps')

  return {
    props: {},
  }
}
