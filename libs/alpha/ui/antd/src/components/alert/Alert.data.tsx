import { AtomType, NodeI } from '@codelab/frontend'

export const alertData: NodeI = {
  type: AtomType.ReactAlert,
  props: {
    message: 'Success Tips',
    description:
      'Detailed description and advice about successful copywriting.',
    type: 'success',
    showIcon: true,
  },
}
