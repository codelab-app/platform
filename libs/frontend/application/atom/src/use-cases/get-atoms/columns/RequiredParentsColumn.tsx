import type { IAtomModel } from '@codelab/frontend/abstract/domain'

import { Space, Tag } from 'antd'

export const RequiredParentsColumn = ({
  requiredParents,
}: Pick<IAtomModel, 'requiredParents'>) => {
  return (
    <Space wrap>
      {requiredParents.map((atom) => {
        return (
          <Tag color="magenta" key={atom.id}>
            {atom.current.name}
          </Tag>
        )
      })}
    </Space>
  )
}
