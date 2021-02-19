export class VegaSchemaConverter {
  finalSchema = {
    type: 'object',
    properties: {
      cssProps: {
        type: 'string',
        enum: [],
      },
    },
    dependencies: {
      cssProps: {
        oneOf: [],
      },
    },
  }

  public processVegaSchema(schema: any) {
    // const props: any = VegaSchema.properties
    const props: any = schema.properties
    const cssChoicesEnumArr = this.finalSchema.properties.cssProps.enum
    const dependenciesArr: Array<any> = this.finalSchema.dependencies.cssProps
      .oneOf
    const keys: Array<string> = Object.keys(props)

    keys.forEach((key: any) => {
      const finalObj: any = {
        properties: {
          cssProps: {
            enum: [key],
          },
        },
      }

      if (props[key].anyOf && props[key].anyOf.length > 0) {
        finalObj.properties[key] = {
          type: 'array',
          items: {
            type: 'object',
            properties: {},
          },
        }

        const anyOfArray = props[key].anyOf
        const enumArr = this.processAnyOfArray(
          anyOfArray,
          finalObj.properties[key].items.properties,
        )

        finalObj.properties[key].items.properties.select = {
          type: 'string',
          enum: [...enumArr],
        }
      }

      if (props[key].type && props[key].type === 'string') {
        finalObj.properties.string = {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              string: { type: 'string' },
            },
          },
        }
      }

      if (props[key].type && props[key].type === 'number') {
        finalObj.properties.number = {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              string: { type: 'number' },
            },
          },
        }
      }

      dependenciesArr.push(finalObj)
      this.addIfNotExist(cssChoicesEnumArr, key)
    })

    return this.finalSchema
  }

  private addIfNotExist(arr: Array<any>, newItem: any) {
    arr.indexOf(newItem) === -1
      ? arr.push(newItem)
      : console.log('This item already exists')
  }

  private processAnyOfArray(anyOfArr: Array<any>, props: any) {
    let result: Array<any> = []

    anyOfArr.forEach((v: any) => {
      if (v.anyOf) {
        result = [...result, ...this.processAnyOfArray(v.anyOf, props)]
      }

      if (v.type === 'string') {
        props.string = {
          type: 'string',
        }
      }

      if (v.type === 'number') {
        props.number = {
          type: 'number',
        }
      }

      if (v.type === 'number' && v.const === 0) {
        props.number = {
          type: 'number',
        }
      }

      if (v.type === 'string' && v.enum) {
        result = [...result, ...v.enum]
      }

      if (v.type === 'number' && v.const) {
        result = [...result, ...v.const]
      }

      if (v.type === 'string' && v.const) {
        result = [...result, ...[v.const]]
      }
    })

    return result
  }
}
