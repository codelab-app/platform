import { ArrowLeftOutlined } from '@ant-design/icons'
import { PageFullFragment } from '@codelab/codegen/graphql'
import { PageType } from '@codelab/frontend/shared'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export const MainPanePageDetailTitle = ({
  page,
}: {
  page: PageFullFragment | undefined | null
}) => {
  const { query } = useRouter()
  const appId = query.appId as string

  return (
    <div tw="flex flex-row items-center gap-x-4">
      <Link
        href={{
          pathname: PageType.PageList,
          query: { appId },
        }}
      >
        <ArrowLeftOutlined />
      </Link>
      <span>{page?.name}</span>
    </div>
  )
}
