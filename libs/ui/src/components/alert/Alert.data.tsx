import { ReactNodeI } from '@codelab/graph'
import { PropsFromKeys } from '@codelab/props'

export const alertPropKeys = [
  'afterClose',
  'banner',
  'closable',
  'closeText',
  'description',
  'icon',
  'message',
  'showIcon',
  'type',
  'onClose',
] as const

type AlertProps = PropsFromKeys<typeof alertPropKeys[number]>

export const alertData: ReactNodeI<AlertProps> = {
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
