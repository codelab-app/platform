import { Text } from '../text'
import { Tabs } from './Tabs.types'
import { NodeDtoReactI } from '@codelab/shared/interface/node'

export const tabsData: NodeDtoReactI<
  Tabs.Props | Tabs.TabPaneProps | Text.Props
> = {
  type: 'React.Tabs',
  props: {
    defaultActiveKey: 1,
  },
  children: [
    {
      type: 'React.Tabs.TabPane',
      props: {
        tab: 'Tab 1',
        key: '1',
      },
      children: [
        {
          type: 'React.Text',
          props: {
            value: 'Content of Tab pane 1',
          },
        },
      ],
    },
    {
      type: 'React.Tabs.TabPane',
      props: {
        tab: 'Tab 2',
        key: '2',
      },
      children: [
        {
          type: 'React.Text',
          props: {
            value: 'Content of Tab pane 2',
          },
        },
      ],
    },
    {
      type: 'React.Tabs.TabPane',
      props: {
        tab: 'Tab 3',
        key: '3',
        disabled: true,
      },
    },
  ],
}
