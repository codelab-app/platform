import {
  CuiHeader,
  CuiHeaderBreadcrumb,
} from '@codelab/frontend-presentation-codelab-ui'
import { UserProfileMenu } from '@codelab/frontend-application-user/components'
import { Image } from 'antd'

export const ComponentListHeader = () => {
  const directionItems = [{ title: 'Components' }]

  return (
    <CuiHeader
      direction={<CuiHeaderBreadcrumb items={directionItems} />}
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
}
