import { IOperation } from '@codelab/shared/abstract/core'
import { Descriptions } from 'antd'
import { keys } from 'lodash'
import { observer } from 'mobx-react-lite'

type ConfigColumnProps = {
  operation: IOperation
}

export const ConfigColumn = observer<ConfigColumnProps>(({ operation }) => {
  return (
    <Descriptions column={1} size="small">
      {keys(operation.config).map((x) => (
        <Descriptions.Item label={x}>
          {operation.config[x as keyof IOperation['config']] as string}
        </Descriptions.Item>
      ))}
    </Descriptions>
  )
})
