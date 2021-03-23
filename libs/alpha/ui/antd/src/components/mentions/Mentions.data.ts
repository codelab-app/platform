import { PropType } from '../../props/PropType'
import { AtomType, NodeI } from '@codelab/frontend'

export const mentionsData: NodeI = {
  type: AtomType.ReactMentions,
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
      type: AtomType.ReactMentionsOption,
      props: { value: 'afc163' },
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: 'afc163',
          },
        },
      ],
    },
    {
      type: AtomType.ReactMentionsOption,
      props: { value: 'zombieJ' },
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: 'zombieJ',
          },
        },
      ],
    },
    {
      type: AtomType.ReactMentionsOption,
      props: { value: 'yesmeck' },
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: 'yesmeck',
          },
        },
      ],
    },
  ],
}
