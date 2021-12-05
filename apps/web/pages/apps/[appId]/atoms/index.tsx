import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage, HeaderProps } from '@codelab/frontend/abstract/props'
import { withAppProvider } from '@codelab/frontend/modules/app'
import {
  CreateAtomButton,
  CreateAtomModal,
  DeleteAtomsModal,
  GetAtomsTable,
  UpdateAtomModal,
} from '@codelab/frontend/modules/atom'
import { BuilderSidebarNavigation } from '@codelab/frontend/modules/builder'
import { DashboardHeader } from '@codelab/frontend/view/sections'
import { DashboardTemplate } from '@codelab/frontend/view/templates'
import { Breadcrumb, Card, PageHeader, Space } from 'antd'
import React from 'react'
import tw from 'twin.macro'

const AtomsPage: CodelabPage<HeaderProps> = () => {
  return (
    <div css={tw`m-6`}>
      <Space direction="vertical" css={tw`flex`}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <span css={tw`text-gray-500`}>Atoms</span>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Card bodyStyle={tw`p-4`}>
          <PageHeader
            css={tw`p-0`}
            title={
              <span css={tw`leading-7 font-normal text-gray-900`}>
                Atom (Interface)
              </span>
            }
            extra={[<CreateAtomButton key="create-atom-button" centerIcon />]}
          />
        </Card>
        <Card bodyStyle={tw`p-0`}>
          <GetAtomsTable />
        </Card>
      </Space>
      <CreateAtomModal />
      <UpdateAtomModal />
      <DeleteAtomsModal />
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired()

AtomsPage.Template = withAppProvider(DashboardTemplate)
AtomsPage.SidebarNavigation = BuilderSidebarNavigation
AtomsPage.Header = DashboardHeader
AtomsPage.MetaPane = null
AtomsPage.MainPane = null

export default AtomsPage
