import type { TabsProps } from 'antd'
import React from 'react'
import StickyBox from 'react-sticky-box'

export const renderStickyTabBar: TabsProps['renderTabBar'] = (
  props,
  DefaultTabBar,
) => (
  <StickyBox style={{ zIndex: 1 }}>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <DefaultTabBar {...props} style={{ background: 'white' }} />
  </StickyBox>
)
