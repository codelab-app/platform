import { Steps } from './Steps.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const stepsData: NodeReactI<Steps.Props | Steps.StepProps> = {
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
