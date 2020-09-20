import { Alert } from './Alert.types'
import { NodeReactDtoI } from '@codelab/shared/interface/node'

export const alertData: NodeReactDtoI<Alert.Props> = {
  type: 'React.Alert',
  props: {
    message: 'Success Tips',
    description:
      'Detailed description and advice about successful copywriting.',
    type: 'success',
    showIcon: true,
  },
}
