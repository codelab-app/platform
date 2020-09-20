import { Statistic } from './Statistic.types'
import { NodeReactDtoI } from '@codelab/shared/interface/node'

export const statisticData: NodeReactDtoI<
  Statistic.Props | Statistic.CountdownProps
> = {
  type: 'React.Statistic',
  props: {
    title: 'Active Users',
    value: 545465,
  },
}
