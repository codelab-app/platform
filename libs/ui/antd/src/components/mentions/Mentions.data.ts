import { Text } from '../text'
import { Mentions } from './Mentions.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const mentionsData: NodeReactI<
  Mentions.Props | Mentions.OptionProps | Text.Props
> = {
  type: NodeType.React_Mentions,
  props: {
    defaultValue: '@afc163',
    placeholder: 'You can use @ to ref user here',
    onChange: {
      __type: ['Eval'],
      value: 'return (value) => console.log(value)',
    },
  },
  children: [
    {
      type: NodeType.React_Mentions_Option,
      props: { value: 'afc163' },
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: 'afc163',
          },
        },
      ],
    },
    {
      type: NodeType.React_Mentions_Option,
      props: { value: 'zombieJ' },
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: 'zombieJ',
          },
        },
      ],
    },
    {
      type: NodeType.React_Mentions_Option,
      props: { value: 'yesmeck' },
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: 'yesmeck',
          },
        },
      ],
    },
  ],
}
