import { Alert } from './Alert.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const alertData: NodeReactI<Alert.Props> = {
  type: NodeType.React_Alert,
  props: {
    message: 'Success Tips',
    description:
      'Detailed description and advice about successful copywriting.',
    type: 'success',
    showIcon: true,
  },
}
