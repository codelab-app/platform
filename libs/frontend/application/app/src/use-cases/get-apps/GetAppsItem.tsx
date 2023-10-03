import type { IAppModel, IDomainModel } from '@codelab/frontend/abstract/domain'
import { ExplorerPaneType, PageType } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { Card } from 'antd'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import React from 'react'
import { DomainsList } from './DomainsList'
import { ItemDropdown } from './ItemDropdown'

export interface GetAppsItemProps {
  app: IAppModel
  domains?: Array<IDomainModel>
}

export const GetAppsItem = observer<GetAppsItemProps>(({ app }) => {
  const { userService } = useStore()

  const href = {
    pathname: PageType.PageBuilder,
    query: {
      appSlug: app.slug,
      pageSlug: app.pages[0]?.current.slug,
      primarySidebarKey: ExplorerPaneType.PageList,
      userSlug: userService.user.username,
    },
  }

  const domains = app.domains.map((domain) => domain.current)
  const Title = <Link href={href}>{app.name}</Link>
  const Dropdown = <ItemDropdown app={app} domains={domains} />

  return (
    <Card extra={Dropdown} title={Title}>
      <DomainsList domains={domains} />
    </Card>
  )
})
