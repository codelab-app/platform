import { AtomType, CreateFieldInput } from '@codelab/codegen/graphql'
import { CustomAtomApiFactory } from '../../utils/customAtomApi'
import { BaseTypeName } from '../baseTypes'

// FIXME: instead of dynamically creating fields, allow us to specify fields in CreateInterfaceTypeInput
// also - create new type input in ArrayTypeInput?

export const propMapperAtom: CustomAtomApiFactory = async (input) => {
  const { createFieldIfMissing, createTypeIfMissing, baseTypeIdsByName } = input

  const bindingInterfaceType = await createTypeIfMissing({
    name: 'Prop Mapper Binding',
    interfaceType: true,
  })

  const string = baseTypeIdsByName.get(BaseTypeName.String)

  const descendantElement = baseTypeIdsByName.get(
    BaseTypeName.DescendantElement,
  )

  const fields: Array<CreateFieldInput> = [
    {
      name: 'Target Element',
      key: 'targetElement',
      description: 'The target element that will receive the props',
      type: { existingTypeId: descendantElement },
      interfaceId: bindingInterfaceType,
    },
    {
      name: 'Source key',
      description: 'The key of the prop, as received in the PropMapper',
      key: 'sourceKey',
      type: { existingTypeId: string },
      interfaceId: bindingInterfaceType,
    },
    {
      name: 'Target key',
      description: 'The key of the prop, that the target Element will receive',
      key: 'targetKey',
      type: { existingTypeId: string },
      interfaceId: bindingInterfaceType,
    },
  ]

  await Promise.all(fields.map((field) => createFieldIfMissing(field)))

  return {
    atomType: AtomType.PropMapper,
    fields: [
      {
        name: 'Bindings',
        key: 'bindings',
        description:
          'Bindings for props from this element to the target child elements',
        type: {
          newType: {
            name: 'Prop Mapper Binding Array',
            arrayType: {
              itemTypeId: bindingInterfaceType,
            },
          },
        },
      },
    ],
  }
}
