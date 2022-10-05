import { IPreRenderType } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import merge from 'lodash/merge'
import { preRenderApi } from './pre-render.api'

interface GetPreRenderParams {
  context: unknown
  pageId: Maybe<string>
  type: IPreRenderType
}

export const GetPreRenderResult = async (params: GetPreRenderParams) => {
  const { context, pageId, type } = params

  if (!pageId) {
    return { props: {} }
  }

  const { preRenders } = await preRenderApi.GetPreRenders({
    where: {
      page: { id: pageId },
      type,
    },
  })

  const result = await Promise.all(
    // eslint-disable-next-line no-eval
    preRenders.map((p) => eval(`(${p.code})`)(context)),
  )

  return result.reduce(merge, {})
}

export const getPreRenderServerSideProps = async (context: any) => {
  const {
    props = {},
    notFound,
    redirect = undefined,
  } = await GetPreRenderResult({
    context,
    pageId: context.params?.pageId?.toString(),
    type: IPreRenderType.GetServerSideProps,
  })

  return { props, notFound, redirect }
}

export const getPreRenderStaticPaths = async (context: any) => {
  const { paths = [], fallback = false } = await GetPreRenderResult({
    context,
    pageId: context.params?.pageId?.toString(),
    type: IPreRenderType.GetStaticPaths,
  })

  return { paths, fallback }
}

export const getPreRenderStaticProps = async (context: any) => {
  const { props = {} } = await GetPreRenderResult({
    context,
    pageId: context.params?.pageId?.toString(),
    type: IPreRenderType.GetStaticProps,
  })

  return { props }
}

export const getPreRenderInitialProps = async (context: any) => {
  const { props = {} } = await GetPreRenderResult({
    context,
    pageId: context.params?.pageId?.toString(),
    type: IPreRenderType.GetInitialProps,
  })

  return { props }
}
