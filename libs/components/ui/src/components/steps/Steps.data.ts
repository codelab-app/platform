import { Steps } from './Steps.types'
import { NodeDtoReactI } from '@codelab/shared/interface/node'

export const stepsData: NodeDtoReactI<Steps.Props | Steps.StepProps> = {
  type: 'React.Steps',
  props: {
    type: 'React.default',
    current: 1,
  },
  children: [
    {
      type: 'React.Steps.Step',
      props: {
        title: 'Step 1',
        description: 'This is a description.',
      },
    },
    {
      type: 'React.Steps.Step',
      props: {
        title: 'Step 2',
        description: 'This is a description.',
      },
    },
    {
      type: 'React.Steps.Step',
      props: {
        title: 'Step 3',
        description: 'This is a description.',
      },
    },
  ],
}
