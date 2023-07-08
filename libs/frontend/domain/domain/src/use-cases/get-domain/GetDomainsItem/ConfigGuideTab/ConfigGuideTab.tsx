import type { IDomain } from '@codelab/frontend/abstract/core'
import { Alert, Tabs } from 'antd'
import React from 'react'
import { ARecordTabContent } from './TabContent/ARecord'

interface ConfigGuideTabProps {
  domain: IDomain
  type: 'ARecord' | 'CName'
}

export const ConfigGuide = ({ domain, type }: ConfigGuideTabProps) => {
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
        className="mt-5 text-xs text-blue-600"
        message="Depending on your provider, it might take some time for the changes to apply. "
        type="info"
      />
    </React.Fragment>
  )
}
