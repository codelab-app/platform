import { IDomain } from '@codelab/frontend/abstract/core'
import { Alert, Tabs } from 'antd'
import React from 'react'
import tw from 'twin.macro'
import { ARecordTabContent } from './TabContent/ARecord'

interface ConfigGuideTabProps {
  type: 'ARecord' | 'CName'
  domain: IDomain
}

const { TabPane } = Tabs

export const ConfigGuide = ({ type, domain }: ConfigGuideTabProps) => {
  return (
    <React.Fragment>
      <Tabs defaultActiveKey="2">
        <TabPane key="1" tab="A Record (Recommended)">
          <ARecordTabContent />
        </TabPane>
        {/* <TabPane tab="or Nameservers" key="2">
          <NameServerTabContent
            intendedNameservers={domain.projectDomainData.intendedNameservers}
            nameServers={domain.projectDomainData.nameservers}
          />
        </TabPane> */}
      </Tabs>
      <Alert
        css={tw`mt-5 text-blue-600 text-xs`}
        message="Depending on your provider, it might take some time for the changes to apply. "
        type="info"
      />
    </React.Fragment>
  )
}
