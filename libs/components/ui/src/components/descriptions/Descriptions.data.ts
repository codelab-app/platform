import { Text } from '../text'
import { Descriptions } from './Descriptions.types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const descriptionsData: NodeDtoI<
  Descriptions.Props | Descriptions.ItemProps | Text.Props
> = {
  type: 'React.Descriptions',
  props: {
    title: 'User Info',
  },
  children: [
    {
      type: 'React.Descriptions.Item',
      props: {
        label: 'UserName',
      },
      children: [
        {
          type: 'React.Text',
          props: {
            value: 'Zhou Maomao',
          },
        },
      ],
    },
    {
      type: 'React.Descriptions.Item',
      props: {
        label: 'Telephone',
      },
      children: [
        {
          type: 'React.Text',
          props: {
            value: '1810000000',
          },
        },
      ],
    },
    {
      type: 'React.Descriptions.Item',
      props: {
        label: 'Live',
      },
      children: [
        {
          type: 'React.Text',
          props: {
            value: 'Hangzhou, Zhejiang',
          },
        },
      ],
    },
    {
      type: 'React.Descriptions.Item',
      props: {
        label: 'Address',
      },
      children: [
        {
          type: 'React.Text',
          props: {
            value:
              'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
          },
        },
      ],
    },
  ],
}
