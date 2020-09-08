import { ReactNodeI } from '@codelab/node'
import { TextProps } from '../text/Text.types'
import { MentionsProps, OptionProps } from './Mentions.types'

export const mentionsData: ReactNodeI<
  MentionsProps | OptionProps | TextProps
> = {
  type: 'Mentions',
  nodeType: 'React',
  props: {
    defaultValue: '@afc163',
    placeholder: 'You can use @ to ref user here',
    onChange: {
      eval: true,
      value: 'return (value) => console.log(value)',
    },
  },
  children: [
    {
      type: 'Mentions.Option',
      nodeType: 'React',
      props: { value: 'afc163' },
      children: [
        {
          type: 'Text',
          nodeType: 'React',
          props: {
            value: 'afc163',
          },
        },
      ],
    },
    {
      type: 'Mentions.Option',
      nodeType: 'React',
      props: { value: 'zombieJ' },
      children: [
        {
          type: 'Text',
          nodeType: 'React',
          props: {
            value: 'zombieJ',
          },
        },
      ],
    },
    {
      type: 'Mentions.Option',
      nodeType: 'React',
      props: { value: 'yesmeck' },
      children: [
        {
          type: 'Text',
          nodeType: 'React',
          props: {
            value: 'yesmeck',
          },
        },
      ],
    },
  ],
}
