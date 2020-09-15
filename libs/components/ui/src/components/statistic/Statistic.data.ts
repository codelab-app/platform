import { Statistic } from './Statistic.types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const statisticData: NodeDtoI<
  Statistic.Props | Statistic.CountdownProps
> = {
  type: 'React.Statistic',
  props: {
    title: 'Active Users',
    value: 545465,
  },
}
