import { Spin } from './Spin.types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const spinData: NodeDtoI<Spin.Props> = {
  type: 'React.Spin',
  props: {
    size: 'default',
    spinning: 'true',
    tip: 'Loading',
  },
}
