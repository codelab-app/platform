import { Text } from '../text'
import { Descriptions } from './Descriptions.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const descriptionsData: NodeReactI<
  Descriptions.Props | Descriptions.ItemProps | Text.Props
> = {
  type: NodeType.React_Descriptions,
  props: {
    title: 'User Info',
  },
  children: [
    {
      type: NodeType.React_Descriptions_Item,
      props: {
        label: 'UserName',
      },
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: 'Zhou Maomao',
          },
        },
      ],
    },
    {
      type: NodeType.React_Descriptions_Item,
      props: {
        label: 'Telephone',
      },
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: '1810000000',
          },
        },
      ],
    },
    {
      type: NodeType.React_Descriptions_Item,
      props: {
        label: 'Live',
      },
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: 'Hangzhou, Zhejiang',
          },
        },
      ],
    },
    {
      type: NodeType.React_Descriptions_Item,
      props: {
        label: 'Address',
      },
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value:
              'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
          },
        },
      ],
    },
  ],
}
