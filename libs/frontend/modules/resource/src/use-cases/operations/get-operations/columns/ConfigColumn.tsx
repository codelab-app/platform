import { Descriptions } from 'antd'
import { keys } from 'lodash'
import { observer } from 'mobx-react-lite'
import { Operation } from '../../../../store'

type ConfigColumnProps = {
  operation: Operation
}

export const ConfigColumn = observer<ConfigColumnProps>(({ operation }) => {
  return (
    <Descriptions column={1} size="small">
      {keys(operation.config).map((x) => (
        <Descriptions.Item label={x}>{operation.config[x]}</Descriptions.Item>
      ))}
    </Descriptions>
  )
})
