import { ReactNodeI } from '@codelab/graph'
import { TextProps } from '../text/Text.types'
import { ButtonProps } from '../button/Button'
import { SpaceProps } from './Space.types'

export const spaceData: ReactNodeI<SpaceProps | ButtonProps | TextProps> = {
  type: 'Space',
  nodeType: 'React',
  props: {
    size: 'middle',
  },
  children: [
    {
      type: 'Button',
      nodeType: 'React',
      props: { type: 'primary' },
      children: [
        { type: 'Text', nodeType: 'React', props: { value: 'Primary' } },
      ],
    },
    {
      type: 'Button',
      nodeType: 'React',
      props: { type: 'default' },
      children: [
        { type: 'Text', nodeType: 'React', props: { value: 'Default' } },
      ],
    },
    {
      type: 'Button',
      nodeType: 'React',
      props: { type: 'dashed' },
      children: [
        { type: 'Text', nodeType: 'React', props: { value: 'Dashed' } },
      ],
    },
  ],
}
