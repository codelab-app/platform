import {
  type IInterfaceTypeModel,
  userRef,
} from '@codelab/frontend/abstract/domain'
import { InterfaceType } from '@codelab/frontend-domain-type/store'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

import { InterfaceForm } from './InterfaceForm'

export const Default = {
  render: () => () => {
    const model = {}

    const onSubmit = (data: unknown) => {
      console.log(data)

      return Promise.resolve()
    }

    const interfaceType: IInterfaceTypeModel = new InterfaceType({
      kind: ITypeKind.InterfaceType,
      name: 'Test',
      owner: userRef(v4()),
    })

    return (
      <InterfaceForm
        interfaceType={interfaceType}
        model={model}
        onSubmit={onSubmit}
      />
    )
  },
}
