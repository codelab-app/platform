import { EnumTypeProperties } from './enum/enum-type.vo'
import { InterfaceTypeProperties } from './interface/interface-type.vo'
import { PrimitiveTypeProperties } from './primitive/primitive-type.vo'
import { TypeFactory } from './type.factory'
import { TypeValueProperties } from './type.interface'

describe('Type', () => {
  describe('PrimitiveType', () => {
    it('can create a string type', () => {
      const stringTypeData: TypeValueProperties<PrimitiveTypeProperties> = {
        kind: 'PrimitiveType',
        props: {
          name: 'String',
          primitiveKind: 'String',
        },
      }

      const stringType = TypeFactory.create(stringTypeData)

      expect(stringType.toString()).toBe('String')
    })
  })

  describe('EnumType', () => {
    const enumTypeData: TypeValueProperties<EnumTypeProperties> = {
      kind: 'EnumType',
      props: {
        name: 'ButtonSize',
        allowedValues: [
          { name: 'Small', stringValue: 'small' },
          { name: 'Middle', stringValue: 'middle' },
          { name: 'Large', stringValue: 'large' },
        ],
      },
    }

    const buttonSizeEnum = TypeFactory.create(enumTypeData)

    // expect(buttonSizeEnum.toString()).toBe(
    //   `enum ButtonSize { Small='small', Middle='middle', Large='large' }`,
    // )

    expect(buttonSizeEnum.toString()).toBe(`'small' | 'middle' | 'large'`)
  })

  describe('InterfaceType', () => {
    const interfaceTypeData: TypeValueProperties<InterfaceTypeProperties> = {
      kind: 'InterfaceType',
      props: {
        name: 'ButtonApi',
        fields: [
          {
            key: 'block',
            type: {
              kind: 'PrimitiveType',
              props: {
                name: 'boolean',
                primitiveKind: 'Boolean',
              },
            },
          },
          {
            key: 'size',
            type: {
              kind: 'EnumType',
              props: {
                name: 'ButtonSize',
                allowedValues: [
                  {
                    stringValue: 'small',
                  },
                  {
                    stringValue: 'middle',
                  },
                  {
                    stringValue: 'large',
                  },
                ],
              },
            },
          },
        ],
      },
    }

    const interfaceType = TypeFactory.create(interfaceTypeData)

    expect(interfaceType.toString()).toBe(
      `interface ButtonApi { block: boolean; size: 'small' | 'middle' | 'large'; }`,
    )
  })
})
