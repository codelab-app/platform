import {
  CuiHeader,
  CuiHeaderBreadcrumb,
} from '@codelab/frontend/presentation/codelab-ui'
import { UserProfileMenu } from '@codelab/frontend-application-user/components'
import { Image } from 'antd'

export const AdminViewHeader = () => (
  <CuiHeader
    direction={<CuiHeaderBreadcrumb items={[{ title: 'Admin' }]} />}
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
