import { ReactNodeI } from '@codelab/shared/interface/node'
import { StatisticProps, CountdownProps } from './Statistic.types'

export const statisticData: ReactNodeI<StatisticProps | CountdownProps> = {
  type: 'Statistic',
  nodeType: 'React',
  props: {
    title: 'Active Users',
    value: 545465,
  },
}
