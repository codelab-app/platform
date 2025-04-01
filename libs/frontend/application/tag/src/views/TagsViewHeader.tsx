'use client'

import {
  CuiHeader,
  CuiHeaderBreadcrumb,
} from '@codelab/frontend/presentation/codelab-ui'
import { UserProfileMenu } from '@codelab/frontend-application-user/components'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'

export const TagsViewHeader = observer(() => {
  return (
    <CuiHeader
      direction={<CuiHeaderBreadcrumb items={[{ title: 'Tags' }]} />}
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
