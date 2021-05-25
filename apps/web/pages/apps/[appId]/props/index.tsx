import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CreatePropButton,
  CreatePropModal,
  DeletePropModal,
  GetPropsList,
  UpdatePropModal,
} from '@codelab/modules/prop'
import { Breadcrumb, Card, PageHeader, Space } from 'antd'
import { LayoutAtom } from 'apps/web/src/layout/Layout--atom'
import React from 'react'
import tw from 'twin.macro'
import { NextPageLayout } from '../../../../src/layout/Layout.d'

const PropsPage: NextPageLayout = () => {
  return (
    <div css={tw`m-6`}>
      <Space direction="vertical" css={tw`flex`}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <span css={tw`text-gray-500`}>Props</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span css={tw`text-gray-500`}>API</span>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Card bodyStyle={tw`p-4`}>
          <PageHeader
            css={tw`p-0`}
            title={
              <span css={tw`leading-7 font-normal text-gray-900`}>
                Props (API)
              </span>
            }
            extra={[<CreatePropButton />]}
          />
        </Card>
        <Card bodyStyle={tw`p-0`}>
          <GetPropsList />
        </Card>
      </Space>
      <CreatePropModal />
      <DeletePropModal />
      <UpdatePropModal />
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired()
PropsPage.Layout = LayoutAtom

export default PropsPage
