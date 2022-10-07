import styled from '@emotion/styled'
import tw from 'twin.macro'

export const TabContainer = styled.div`
  //height: 100%;
  //display: flex;
  //width: 100%;
  //border-top: rgba(211, 211, 211, 0.21) 1px solid;

  .ant-tabs {
    ${tw`px-4 mb-0`} //
    .ant-tabs {
      ${tw`px-0`}
    }
    // > .ant-tabs-nav {
    //   ${tw`px-4 mb-0`}
    // }
    // .ant-tabs-content {
    //   ${tw`px-4 py-3 mb-3`}
    // }
    // // Remove antd tab padding so tooltip can cover more area
    // .ant-tabs-tab {
    //   height: 32px;
    //   ${tw`!p-0`}
    // }
    // .ant-tabs-tab-btn {
    //   ${tw`!h-full flex items-center`}
    // }
  }

  // .ant-layout-sider-children,
  // .ant-tabs,
  // .ant-tabs-content,
  // .ant-tabs-content-holder,
  // .ant-tabs-tabpane,
  // .tab-panel {
  //   width: 100%;
  //   ${tw`flex flex-col flex-grow min-h-0 overflow-visible`}
  // }
  //
  // .suggest-details-container,
  // .editor-widget {
  //   z-index: 50;
  // }
`
