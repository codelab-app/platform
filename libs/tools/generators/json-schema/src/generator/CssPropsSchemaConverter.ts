export class CssPropsSchemaConverter {
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

  public processSchema(schema: any) {
    const props: any = schema.definitions.CSSProperties.properties
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

      finalObj.properties[key] = {
        type: 'array',
        items: {
          type: 'object',
          properties: {},
        },
      }

      if (props[key].enum) {
        finalObj.properties[key].items.properties.select = {
          type: 'string',
          enum: [...props[key].enum],
        }
      }

      if (props[key].anyOf) {
        const enumArr = this.processAnyOfArray(
          props[key].anyOf,
          finalObj.properties[key].items.properties,
        )

        finalObj.properties[key].items.properties.select = {
          type: 'string',
          enum: [...enumArr],
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

    anyOfArr.forEach((value: any) => {
      if (value.allOf) {
        value.allOf.forEach((valueAllOf: any) => {
          if (valueAllOf.type === 'string') {
            props.string = {
              type: 'string',
            }
          }

          if (valueAllOf.type === 'number') {
            props.number = {
              type: 'number',
            }
          }
        })
      }

      if (value.enum) {
        result = [...result, ...value.enum]
      }
    })

    return result
  }
}
