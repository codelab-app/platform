import { ReactNodeI } from '@codelab/shared/interface/node'
import { SpinProps } from './Spin.types'

export const spinData: ReactNodeI<SpinProps> = {
  type: 'Spin',
  nodeType: 'React',
  props: {
    size: 'default',
    spinning: 'true',
    tip: 'Loading',
  },
}
