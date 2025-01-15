import type {
  IFieldDto,
  IInterfaceTypeDto,
  ITypeDto,
} from '@codelab/shared/abstract/core'

import { type IInterfaceTypeModel } from '@codelab/frontend/abstract/domain'
import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { systemTypesData } from '@codelab/shared/data/seed'
import { userDto } from '@codelab/shared/data/test'
import { v4 } from 'uuid'

import { InterfaceForm } from './InterfaceForm'

export default {
  component: InterfaceForm,
  title: 'InterfaceForm',
}

const DefaultInterfaceForm = ({
  interfaceTypeId,
}: {
  interfaceTypeId: string
}) => {
  const { fieldDomainService, typeDomainService } = useDomainStore()
  const model = {}

  const onSubmit = (data: unknown) => {
    console.log(data)

    return Promise.resolve()
  }

  const interfaceTypeModel =
    typeDomainService.type<IInterfaceTypeModel>(interfaceTypeId)

  const reactNodeType = typeDomainService.typeByKind(ITypeKind.ReactNodeType)

  const reactNodeTypeField: IFieldDto = {
    api: { id: interfaceTypeModel.id },
    fieldType: { id: reactNodeType.id },
    id: v4(),
    key: 'component',
    name: 'Component',
  }

  fieldDomainService.hydrate(reactNodeTypeField)

  console.log(interfaceTypeModel)

  return (
    <InterfaceForm
      interfaceType={interfaceTypeModel}
      model={model}
      onSubmit={onSubmit}
    />
  )
}

const InterfaceFormHydrator = () => {
  const interfaceType: IInterfaceTypeDto = {
    __typename: ITypeKind.InterfaceType,
    id: v4(),
    kind: ITypeKind.InterfaceType,
    name: 'Test',
    owner: { id: userDto.id },
  }

  const systemTypes = systemTypesData(userDto)
  const typesDto: Array<ITypeDto> = [...systemTypes, interfaceType]

  return (
    <DomainStoreHydrator typesDto={typesDto}>
      <DefaultInterfaceForm interfaceTypeId={interfaceType.id} />
    </DomainStoreHydrator>
  )
}

export const Default = {
  render: () => <InterfaceFormHydrator />,
}
