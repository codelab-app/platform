import { AtomType, NodeI } from '@codelab/frontend'

export const tabsData: NodeI = {
  type: AtomType.ReactTabs,
  props: {
    defaultActiveKey: 1,
  },
  children: [
    {
      type: AtomType.ReactTabsTabPane,
      props: {
        tab: 'Tab 1',
        key: '1',
      },
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: 'Content of Tab pane 1',
          },
        },
      ],
    },
    {
      type: AtomType.ReactTabsTabPane,
      props: {
        tab: 'Tab 2',
        key: '2',
      },
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: 'Content of Tab pane 2',
          },
        },
      ],
    },
    {
      type: AtomType.ReactTabsTabPane,
      props: {
        tab: 'Tab 3',
        key: '3',
        disabled: true,
      },
    },
  ],
}
