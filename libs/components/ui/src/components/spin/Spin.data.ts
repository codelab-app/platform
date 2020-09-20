import { Spin } from './Spin.types'
import { NodeReactDtoI } from '@codelab/shared/interface/node'

export const spinData: NodeReactDtoI<Spin.Props> = {
  type: 'React.Spin',
  props: {
    size: 'default',
    spinning: 'true',
    tip: 'Loading',
  },
}
