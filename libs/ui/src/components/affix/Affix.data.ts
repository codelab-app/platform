import { ReactNodeI } from '@codelab/node'
import { PropsFromKeys } from '@codelab/props'
import { TextProps } from '../text/Text.types'
import { ButtonProps } from '../button'

export const affixPropKeys = [
  'offsetBottom',
  'offsetTop',
  'target',
  'onChange',
] as const

type AffixProps = PropsFromKeys<typeof affixPropKeys[number]>

export const affixData: ReactNodeI<AffixProps | TextProps | ButtonProps> = {
  type: 'Affix',
  nodeType: 'React',
  props: {
    offsetTop: 120,
  },
  children: [
    {
      type: 'Button',
      nodeType: 'React',
      props: {
        type: 'primary',
      },
      children: [
        {
          type: 'Text',
          nodeType: 'React',
          props: {
            value: '120px to affix top',
          },
        },
      ],
    },
  ],
}
