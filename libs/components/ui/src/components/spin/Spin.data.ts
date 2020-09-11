import { ReactNodeI } from '@codelab/shared/interface/node'
import { Spin } from './Spin.types'

export const spinData: ReactNodeI<Spin.Props> = {
  type: 'Spin',
  nodeType: 'React',
  props: {
    size: 'default',
    spinning: 'true',
    tip: 'Loading',
  },
}
