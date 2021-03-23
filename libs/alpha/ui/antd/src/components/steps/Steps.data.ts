import { AtomType, NodeI } from '@codelab/frontend'

export const stepsData: NodeI = {
  type: AtomType.ReactSteps,
  props: {
    type: 'default',
    current: 1,
  },
  children: [
    {
      type: AtomType.ReactStepsStep,
      props: {
        title: 'Step 1',
        description: 'This is a description.',
      },
    },
    {
      type: AtomType.ReactStepsStep,
      props: {
        title: 'Step 2',
        description: 'This is a description.',
      },
    },
    {
      type: AtomType.ReactStepsStep,
      props: {
        title: 'Step 3',
        description: 'This is a description.',
      },
    },
  ],
}
