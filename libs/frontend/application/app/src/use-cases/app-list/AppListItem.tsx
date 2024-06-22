import type { IAppModel } from '@codelab/frontend/abstract/domain'
import { ExplorerPaneType, PageType } from '@codelab/frontend/abstract/types'
import { useUser } from '@codelab/frontend-application-user/services'
import { Card } from 'antd'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import React from 'react'
import { AppListItemDropdown } from './AppListItem__Dropdown'
import { DomainList } from './DomainList'

export const AppListItem = observer<{
  app: IAppModel
}>(({ app }) => {
  const { username } = useUser()

  const href = {
    pathname: PageType.PageBuilder,
    query: {
      appSlug: app.slug,
      pageSlug: app.pages[0]?.slug,
      primarySidebarKey: ExplorerPaneType.PageList,
      userSlug: username,
    },
  }

  const Title = <Link href={href}>{app.name}</Link>
  const Dropdown = <AppListItemDropdown app={app} />

  return (
    <Card extra={Dropdown} title={Title}>
      <DomainList app={app} />
    </Card>
  )
})
