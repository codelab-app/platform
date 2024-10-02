import type { ICreateFieldData } from '@codelab/shared/abstract/core'

import { useDomainStore } from '@codelab/frontend-infra-mobx/context'

import { fieldService } from '../../services'

const useCreateFieldService = async (createFieldData: ICreateFieldData) => {
  const { fieldDomainService, typeDomainService } = useDomainStore()

  // Need to load the field type if its not loaded yet
  if (!typeDomainService.types.has(createFieldData.fieldType)) {
    await typeService.getOne(createFieldData.fieldType)
  }

  const field = fieldDomainService.hydrate(
    fieldService.mapDataToDto(createFieldData),
  )

  const interfaceType = typeService.type(field.api.id) as IInterfaceTypeModel

  interfaceType.writeCache({
    fields: [{ id: field.id }],
  })

  await fieldRepository.add(field)

  return field
}
