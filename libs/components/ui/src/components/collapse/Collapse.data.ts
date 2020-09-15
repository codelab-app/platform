import { Text } from '../text'
import { Collapse } from './Collapse.types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const collapseData: NodeDtoI<
  Collapse.PanelProps | Collapse.Props | Text.Props
> = {
  type: 'React.Collapse',
  props: {
    defaultActiveKey: '1',
  },
  children: [
    {
      type: 'React.Collapse.Panel',
      props: {
        header: 'This is panel header 1',
        key: 1,
      },
      children: [
        {
          type: 'React.Text',
          props: {
            value: 'This is panel text 1',
          },
        },
      ],
    },
    {
      type: 'React.Collapse.Panel',
      props: {
        header: 'This is panel header 2',
        key: 2,
      },
      children: [
        {
          type: 'React.Text',
          props: {
            value: 'This is panel text 2',
          },
        },
      ],
    },
    {
      type: 'React.Collapse.Panel',
      props: {
        header: 'This is panel header 3',
        key: 3,
        disabled: 'true',
      },
      children: [
        {
          type: 'React.Text',
          props: {
            value: 'This is panel text 3',
          },
        },
      ],
    },
  ],
}
