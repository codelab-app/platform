import { Text } from '../text'
import { Collapse } from './Collapse.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const collapseData: NodeReactI<
  Collapse.PanelProps | Collapse.Props | Text.Props
> = {
  type: NodeType.React_Collapse,
  props: {
    defaultActiveKey: '1',
  },
  children: [
    {
      type: NodeType.React_Collapse_Panel,
      props: {
        header: 'This is panel header 1',
        key: 1,
      },
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: 'This is panel text 1',
          },
        },
      ],
    },
    {
      type: NodeType.React_Collapse_Panel,
      props: {
        header: 'This is panel header 2',
        key: 2,
      },
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: 'This is panel text 2',
          },
        },
      ],
    },
    {
      type: NodeType.React_Collapse_Panel,
      props: {
        header: 'This is panel header 3',
        key: 3,
        disabled: 'true',
      },
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: 'This is panel text 3',
          },
        },
      ],
    },
  ],
}
