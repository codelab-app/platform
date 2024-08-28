import type { IAppModel } from '@codelab/frontend/abstract/domain'
import { IPageKind, IPageKindName } from '@codelab/shared/abstract/core'
import { Card } from 'antd'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import React from 'react'
import { AppListItemDropdown } from './AppListItemDropdown'
import { DomainList } from './DomainList'

export interface AppListItemProps {
  app: IAppModel
}

export const AppListItem = observer(({ app }: AppListItemProps) => {
  const Title = (
    <Link
      aria-label={app.name}
      href={`/apps/${app.slug}/pages/${IPageKindName.Provider}/builder`}
    >
      {app.name}
    </Link>
  )

  const Dropdown = <AppListItemDropdown app={app} />

  return (
    <Card aria-label={app.name} extra={Dropdown} role="article" title={Title}>
      <DomainList app={app} />
    </Card>
  )
})
