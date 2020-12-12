import { Text } from '../text'
import { Tabs } from './Tabs.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const tabsData: NodeReactI<
  Tabs.Props | Tabs.TabPaneProps | Text.Props
> = {
  type: NodeType.React_Tabs,
  props: {
    defaultActiveKey: 1,
  },
  children: [
    {
      type: NodeType.React_Tabs_TabPane,
      props: {
        tab: 'Tab 1',
        key: '1',
      },
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: 'Content of Tab pane 1',
          },
        },
      ],
    },
    {
      type: NodeType.React_Tabs_TabPane,
      props: {
        tab: 'Tab 2',
        key: '2',
      },
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: 'Content of Tab pane 2',
          },
        },
      ],
    },
    {
      type: NodeType.React_Tabs_TabPane,
      props: {
        tab: 'Tab 3',
        key: '3',
        disabled: true,
      },
    },
  ],
}
