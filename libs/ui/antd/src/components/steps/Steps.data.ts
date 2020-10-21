import { Steps } from './Steps.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const stepsData: NodeReactI<Steps.Props | Steps.StepProps> = {
  type: NodeType.React_Steps,
  props: {
    type: 'default',
    current: 1,
  },
  children: [
    {
      type: NodeType.React_Steps_Step,
      props: {
        title: 'Step 1',
        description: 'This is a description.',
      },
    },
    {
      type: NodeType.React_Steps_Step,
      props: {
        title: 'Step 2',
        description: 'This is a description.',
      },
    },
    {
      type: NodeType.React_Steps_Step,
      props: {
        title: 'Step 3',
        description: 'This is a description.',
      },
    },
  ],
}
