import React from 'react'
import { CreatePageModal } from '../../pages/createPage/CreatePageModal'
import { GetPagesList } from '../../pages/getPages/GetPagesList'
import { PropsWithIds } from '@codelab/frontend'
import { PageFragmentsFragment } from '@codelab/generated'

export type DashboardNavigationProps = {
  pages: Array<PageFragmentsFragment>
} & PropsWithIds<'appId'>

export const DashboardNavigation = ({
  appId,
  pages,
}: DashboardNavigationProps) => {
  return (
    <>
      <GetPagesList pages={pages} appId={appId} />
      <CreatePageModal appId={appId} />
    </>
  )
}
