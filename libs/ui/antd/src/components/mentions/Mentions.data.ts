import { Text } from '../text'
import { Mentions } from './Mentions.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const mentionsData: NodeReactI<
  Mentions.Props | Mentions.OptionProps | Text.Props
> = {
  type: 'React.Mentions',
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
      type: 'React.Mentions.Option',
      props: { value: 'afc163' },
      children: [
        {
          type: 'React.Text',
          props: {
            value: 'afc163',
          },
        },
      ],
    },
    {
      type: 'React.Mentions.Option',
      props: { value: 'zombieJ' },
      children: [
        {
          type: 'React.Text',
          props: {
            value: 'zombieJ',
          },
        },
      ],
    },
    {
      type: 'React.Mentions.Option',
      props: { value: 'yesmeck' },
      children: [
        {
          type: 'React.Text',
          props: {
            value: 'yesmeck',
          },
        },
      ],
    },
  ],
}
