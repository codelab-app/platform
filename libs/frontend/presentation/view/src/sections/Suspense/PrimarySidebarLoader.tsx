import { Space } from '@codelab/frontend-presentation-components-space'
import { Skeleton } from 'antd'

export const PrimarySidebarLoader = () => {
  return (
    <Space className="w-full p-2" direction="vertical" size="large">
      {/* <Skeleton.Input active block /> */}
      <Skeleton active title />
      <Skeleton active paragraph={{ rows: 10 }} />
    </Space>
  )
}
