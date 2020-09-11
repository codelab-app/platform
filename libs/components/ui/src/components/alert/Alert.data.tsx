import { ReactNodeI } from '@codelab/shared/interface/node'
import { Alert } from './Alert.types'

export const alertData: ReactNodeI<Alert.Props> = {
  type: 'Alert',
  nodeType: 'React',
  props: {
    message: 'Success Tips',
    description:
      'Detailed description and advice about successful copywriting.',
    type: 'success',
    showIcon: true,
  },
}
