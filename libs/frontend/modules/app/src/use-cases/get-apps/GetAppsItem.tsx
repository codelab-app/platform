import { PageType } from '@codelab/frontend/abstract/types'
import { IApp, IAppService } from '@codelab/shared/abstract/core'
import { Card } from 'antd'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { ItemDropdown } from './ItemDropdown'

export type GetAppsItemProps = {
  app: IApp
  appService: IAppService
}

export const GetAppsItem = observer<GetAppsItemProps>(({ app, appService }) => {
  const href = { pathname: PageType.PageList, query: { appId: app.id } }

  const Title = (
    <Link href={href}>
      <a>{app.name}</a>
    </Link>
  )

  return (
    <Card
      extra={<ItemDropdown app={app} appService={appService} />}
      title={Title}
    />
  )
})
