import { Button } from '../button'
import { Text } from '../text'
import { Space } from './Space.types'
import { NodeReactDtoI } from '@codelab/shared/interface/node'

export const spaceData: NodeReactDtoI<
  Space.Props | Button.Props | Text.Props
> = {
  type: 'React.Space',
  props: {
    size: 'middle',
  },
  children: [
    {
      type: 'React.Button',
      props: { type: 'React.primary' },
      children: [{ type: 'React.Text', props: { value: 'Primary' } }],
    },
    {
      type: 'React.Button',
      props: { type: 'React.default' },
      children: [{ type: 'React.Text', props: { value: 'Default' } }],
    },
    {
      type: 'React.Button',
      props: { type: 'React.dashed' },
      children: [{ type: 'React.Text', props: { value: 'Dashed' } }],
    },
  ],
}
