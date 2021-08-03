import { AtomEntity, AtomProperties } from './atom.entity'

describe('Atom', () => {
  it('can create an atom', () => {
    const atomProps: AtomProperties = {
      atomType: 'AntDesignButton',
      name: 'Button',
      api: {
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
      },
    }

    const atom = AtomEntity.create(atomProps)

    expect(atom.name).toBe('Button')
  })
})
