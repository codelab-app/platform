import type { IDomain } from '@codelab/frontend/abstract/core'
import { Alert, Tabs } from 'antd'
import React from 'react'
import tw from 'twin.macro'
import { ARecordTabContent } from './TabContent/ARecord'

interface ConfigGuideTabProps {
  type: 'ARecord' | 'CName'
  domain: IDomain
}

export const ConfigGuide = ({ type, domain }: ConfigGuideTabProps) => {
  const items = [
    {
      children: <ARecordTabContent />,
      key: '1',
      label: 'A Record (Recommended)',
    },
  ]

  return (
    <React.Fragment>
      <Tabs defaultActiveKey="2" items={items} />
      {/* <TabPane tab="or Nameservers" key="2">
          <NameServerTabContent
            intendedNameservers={domain.projectDomainData.intendedNameservers}
            nameServers={domain.projectDomainData.nameservers}
          />
        </TabPane> */}
      <Alert
        css={tw`mt-5 text-blue-600 text-xs`}
        message="Depending on your provider, it might take some time for the changes to apply. "
        type="info"
      />
    </React.Fragment>
  )
}
