import { DeleteTwoTone } from '@ant-design/icons'
import Link from 'next/link'
import React from 'react'
import { Page } from '@codelab/frontend'
import {
  GetPagesGql,
  PageFragmentsFragment,
  useDeletePageMutation,
} from '@codelab/generated'

interface GetPagesListProps {
  pages: Array<PageFragmentsFragment>
  appId: string
}

export const GetPagesList = ({ pages, appId }: GetPagesListProps) => {
  const [deletePage] = useDeletePageMutation({
    refetchQueries: [
      {
        query: GetPagesGql,
        variables: {
          input: {
            appId,
          },
        },
      },
    ],
  })

  return (
    <>
      {pages.map((page) => (
        <div key={`${page.id}`}>
          <Link
            href={{
              pathname: Page.PAGE_DETAIL.url,
              query: { appId, pageId: page.id },
            }}
          >
            <a>{page.title}</a>
          </Link>
          <DeleteTwoTone
            onClick={() =>
              deletePage({ variables: { input: { pageId: page.id } } })
            }
          />
        </div>
      ))}
    </>
  )
}
