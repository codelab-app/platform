import type { IAppModel } from '@codelab/frontend/abstract/domain'
import { ariaLabels } from '@codelab/frontend-application-shared-data'
import { Card } from 'antd'
import Link from 'next/link'
import React from 'react'
import { AppListItemDropdown } from './AppListItemDropdown'
import { DomainList } from './DomainList'
import { ariaLabels } from '@codelab/frontend-application-shared-data'

export interface AppListItemProps {
  app: IAppModel
}

export const AppListItem = ({ app }: AppListItemProps) => {
  const { link, root } = ariaLabels.appListItem

  const Title = (
    <Link aria-label={link(app.name)} href="/apps">
      {app.name}
    </Link>
  )

  const Dropdown = <AppListItemDropdown app={app} />

  return (
    <Card aria-label={root(app.name)} extra={Dropdown} title={Title}>
      <DomainList app={app} />
    </Card>
  )
}
