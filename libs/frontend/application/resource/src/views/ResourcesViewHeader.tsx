'use client'

import { UserProfileMenu } from '@codelab/frontend-application-user/components'
import {
  CuiHeader,
  CuiHeaderBreadcrumb,
} from '@codelab/frontend-presentation-codelab-ui'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'

export const ResourcesViewHeader = observer(() => {
  return (
    <CuiHeader
      direction={<CuiHeaderBreadcrumb items={[{ title: 'Resources' }]} />}
      logo={
        <Image
          alt="codelab logo"
          className="size-full"
          preview={false}
          src="/logo.png"
        />
      }
      userMenu={<UserProfileMenu />}
    />
  )
})
