import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CreateAtomButton,
  CreateAtomModal,
  DeleteAtomsModal,
  GetAtomsTable,
  UpdateAtomModal,
} from '@codelab/modules/atom'
import { Breadcrumb, Card, PageHeader, Space } from 'antd'
import { AtomTemplate } from 'apps/web/src/templates/AtomTemplate'
import React from 'react'
import tw from 'twin.macro'
import { NextPageTemplate } from '../../../../src/templates/Layout.interface'

const AtomsPage: NextPageTemplate = () => {
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
            extra={[<CreateAtomButton />]}
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
AtomsPage.Template = AtomTemplate

export default AtomsPage
