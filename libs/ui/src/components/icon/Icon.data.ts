import { ReactNodeI } from '@codelab/graph'
import { PropsFromKeys } from '@codelab/props'

export const iconPropKeys = [
  'type',
  'style',
  'theme',
  'spin',
  'rotate',
  'twoToneColor',
] as const

type IconProps = PropsFromKeys<typeof iconPropKeys[number]>

export const iconData: ReactNodeI<IconProps> = {
  type: 'Icon',
  nodeType: 'React',
  props: {
    type: 'home',
    theme: 'outlined',
    style: { fontSize: '24px' },
  },
}
