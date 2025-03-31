import type { IAppModel } from '@codelab/frontend/abstract/domain'

import { RoutePaths } from '@codelab/frontend/abstract/application'
import { IPageKind } from '@codelab/shared/abstract/core'
import { Card } from 'antd'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'

import { AppListItemDropdown } from './AppListItemDropdown'
import { DomainList } from './DomainList'

export interface AppListItemProps {
  app: IAppModel
}

export const AppListItem = observer(({ app }: AppListItemProps) => {
  const providerPage = app.pages.find(
    (page) => page.current.kind === IPageKind.Provider,
  )

  if (!providerPage) {
    throw new Error('Missing provider page')
  }

  const Title = (
    <Link
      aria-label={app.name}
      href={RoutePaths.Page.list({ appId: app.id, pageId: providerPage.id })}
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
