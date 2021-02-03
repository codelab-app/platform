import { CloseOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import React from 'react'
import { sectionStyle } from '../../styles/sectionStyle'
import { CreatePageButton } from '../../useCases/pages/createPage/CreatePageButton'
import { CreatePageModal } from '../../useCases/pages/createPage/CreatePageModal'
import { GetPagesList } from '../../useCases/pages/getPages/GetPagesList'
import { useBuilderLayout } from '../builderPanelState'
import { PropsWithIds } from '@codelab/frontend'
import { PageFragmentsFragment } from '@codelab/generated'

export type BuilderNavigationProps = {
  pages: Array<PageFragmentsFragment>
} & PropsWithIds<'appId'>

export const BuilderNavigation = ({ appId, pages }: BuilderNavigationProps) => {
  const layout = useBuilderLayout()

  return (
    <div style={sectionStyle}>
      <Space align="baseline">
        <h2>Pages</h2>
        <CloseOutlined onClick={() => layout.navigation.toggle()} />
        <CreatePageButton />
      </Space>
      <GetPagesList pages={pages} appId={appId} />
      <CreatePageModal appId={appId} />
    </div>
  )
}
