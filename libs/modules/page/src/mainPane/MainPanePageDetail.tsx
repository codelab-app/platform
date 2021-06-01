import { ArrowLeftOutlined } from '@ant-design/icons'
import { AppPageContext } from '@codelab/frontend/shared'
import { PageFullFragment, useGetPageLazyQuery } from '@codelab/graphql'
import Spin from 'antd/lib/spin'
import React, { useContext, useEffect } from 'react'
import xw from 'xwind'
import { MainPaneTemplate } from '../../../../frontend/layout/src'
import { CreatePageElementButton } from '../pageElement'

const Title = ({
  page,
  loading,
}: {
  page: PageFullFragment | undefined | null
  loading: boolean
}) => {
  if (loading) {
    return <Spin />
  }

  return (
    <div tw="flex flex-row items-center">
      <ArrowLeftOutlined />
      {page?.name}
    </div>
  )
}

export const MainPanePageDetail = () => {
  const { pageId } = useContext(AppPageContext)
  const [getPage, { data, loading }] = useGetPageLazyQuery()

  useEffect(() => {
    getPage({ variables: { input: { pageId } } })
  }, [pageId])

  const page = data?.page

  return (
    <MainPaneTemplate
      title={<Title loading={loading} page={page} />}
      header={<CreatePageElementButton loading={loading} key={0} />}
    >
      {page && <>{page.name}</>}
    </MainPaneTemplate>
  )
}
