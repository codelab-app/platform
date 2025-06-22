import { UserProfileMenu } from '@codelab/frontend-application-user/components'
import {
  CuiHeader,
  CuiHeaderBreadcrumb,
} from '@codelab/frontend-presentation-codelab-ui'
import { Image } from 'antd'

export const AuthGuardsViewHeader = () => {
  return (
    <CuiHeader
      direction={<CuiHeaderBreadcrumb items={[{ title: 'Auth Guards' }]} />}
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
