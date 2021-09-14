import { HeaderProps } from '@codelab/frontend/abstract/props'
import { Menu } from 'antd'
import { HeaderPageList } from './header/HeaderPageList'

const { SubMenu } = Menu

export const DashboardHeader = (props: HeaderProps) => {
  // const { app } = useContext(AppContext)

  // const { data, loading } = useGetPagesQuery({
  //   variables: {
  //     input: { byApp: { appId: app.id } },
  //   },
  // })

  // if (loading || !data) {
  //   return null
  // }

  return (
    <Menu theme="light" mode="horizontal" triggerSubMenuAction="click">
      <HeaderPageList {...props} />
    </Menu>
  )
}
