import { PageType } from '@codelab/frontend/abstract/types'
import { Card } from 'antd'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { AppModel, AppService, WithAppService } from '../../store'
import { ItemDropdown } from './ItemDropdown'

export type GetAppsItemProps = {
  app: AppModel
} & WithAppService

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
