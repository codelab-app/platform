import { ReactNodeI } from '@codelab/graph'
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
