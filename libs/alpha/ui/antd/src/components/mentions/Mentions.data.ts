import { Text } from '../text'
import { Mentions } from './Mentions.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'
import { PropType } from '@codelab/alpha/shared/interface/props'

export const mentionsData: NodeReactI<
  Mentions.Props | Mentions.OptionProps | Text.Props
> = {
  type: NodeType.React_Mentions,
  props: {
    defaultValue: '@afc163',
    placeholder: 'You can use @ to ref user here',
    onChange: {
      __type: [PropType.Eval],
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
