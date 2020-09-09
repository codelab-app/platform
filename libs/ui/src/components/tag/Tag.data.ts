import { ReactNodeI } from '@codelab/node'
import { PropsFromKeys } from '@codelab/shared/interface'
import { TextProps } from '../text/Text.types'

export const tagPropKeys = [
  'closable',
  'color',
  'closeIcon',
  'onClose',
  'visible',
  'icon',
] as const

type TagProps = PropsFromKeys<typeof tagPropKeys[number]>

export const tagData: ReactNodeI<TagProps | TextProps> = {
  type: 'Tag',
  nodeType: 'React',
  props: { closable: true },
  children: [
    {
      type: 'Text',
      nodeType: 'React',
      props: {
        value: 'Tag 1',
      },
    },
  ],
}
