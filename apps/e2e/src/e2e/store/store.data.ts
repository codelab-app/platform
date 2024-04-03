import type { ICreateFieldData, IRef } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

const primitiveTypeId = '44c7df30-5f72-45ca-a3d1-d08f21ad34ba'

export const storeTitleFieldDto = (interfaceType: IRef): ICreateFieldData => ({
  fieldType: primitiveTypeId,
  id: v4(),
  interfaceTypeId: interfaceType.id,
  key: 'title',
})

export const storeDescriptionFieldDto = (
  interfaceType: IRef,
): ICreateFieldData => ({
  fieldType: primitiveTypeId,
  id: v4(),
  interfaceTypeId: interfaceType.id,
  key: 'description',
})
