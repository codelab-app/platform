import { PageType } from '@codelab/frontend/abstract/types'
import { Card } from 'antd'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { AppModel, AppStore } from '../../store'
import { ItemDropdown } from './ItemDropdown'

export interface GetAppsItemProps {
  app: AppModel
  apps: AppStore
}

export const GetAppsItem = observer(({ app, apps }: GetAppsItemProps) => {
  const href = { pathname: PageType.PageList, query: { appId: app.id } }

  const Title = (
    <Link href={href}>
      <a>{app.name}</a>
    </Link>
  )

  return <Card extra={<ItemDropdown app={app} apps={apps} />} title={Title} />
})
