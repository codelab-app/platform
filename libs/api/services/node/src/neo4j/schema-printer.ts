import {
  ASTNode,
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLSchema,
  GraphQLUnionType,
  astFromValue,
  print,
} from 'graphql'

export class SchemaPrinter {
  printSchemaWithDirectives(schema: any) {
    const directives = schema.getDirectives()
    const typeMap = schema.getTypeMap()
    const types = Object.keys(typeMap)
      .filter((k) => !k.match(/^__/))
      .sort((name1, name2) => name1.localeCompare(name2))
      .map((typeName) => typeMap[typeName])

    const m = types.map((type) => {
      if (type instanceof GraphQLScalarType) {
        // return this.printScalar(type);
        return ''
      }

      if (type instanceof GraphQLObjectType) {
        return this.printObject(type)
      }

      if (type instanceof GraphQLInterfaceType) {
        return this.printInterface(type)
      }

      if (type instanceof GraphQLUnionType) {
        return this.printUnion(type)
      }

      if (type instanceof GraphQLEnumType) {
        return this.printEnum(type)
      }

      if (type instanceof GraphQLInputObjectType) {
        return this.printInputObject(type as GraphQLInputObjectType)
      }

      return ''
    })
    // Logger.log(m);
    // return [this.printSchemaDefinition(schema)].concat(
    //     directives.map((directive: GraphQLDirective) => {
    //       return 'directive @' + directive.name + this.printArgs(directive) +
    //           ' on ' + directive.locations.join(' | ');
    //     }), m).join('\n\n') + '\n';

    return [this.printSchemaDefinition(schema)].concat(m).join('\n')
  }

  printSchemaDefinition(schema: GraphQLSchema): string {
    const operationTypes = []

    const queryType = schema.getQueryType()

    if (queryType) {
      operationTypes.push(`  query: ${queryType}`)
    }

    const mutationType = schema.getMutationType()

    if (mutationType) {
      operationTypes.push(`  mutation: ${mutationType}`)
    }

    const subscriptionType = schema.getSubscriptionType()

    if (subscriptionType) {
      operationTypes.push(`  subscription: ${subscriptionType}`)
    }

    return `schema {\n${operationTypes.join('\n')}}`
  }

  // printType(type: GraphQLType): string {
  //     if (type instanceof GraphQLScalarType) {
  //         return this.printScalar(type);
  //     } else if (type instanceof GraphQLObjectType) {
  //         return this.printObject(type);
  //     } else if (type instanceof GraphQLInterfaceType) {
  //         return this.printInterface(type);
  //     } else if (type instanceof GraphQLUnionType) {
  //         return this.printUnion(type);
  //     } else if (type instanceof GraphQLEnumType) {
  //         return this.printEnum(type);
  //     }
  //     if (type instanceof GraphQLInputObjectType) {
  //         return this.printInputObject(type as GraphQLInputObjectType);
  //     }
  //     return '';
  // }

  invariant(condition: any, message?: string) {
    if (!condition) {
      throw new Error(message)
    }
  }

  isNullish(value: any): boolean {
    return value === null || value === undefined
  }

  printScalar(type: GraphQLScalarType): string {
    return `scalar ${type.name}`
  }

  printObject(type: GraphQLObjectType): string {
    if (typeof type !== 'undefined') {
      const interfaces = type.getInterfaces()
      const implementedInterfaces = interfaces.length
        ? ` implements ${interfaces.map((i) => i.name).join(', ')}`
        : ''

      return `type ${type.name}${implementedInterfaces} {\n${this.printFields(
        type,
      )}\n}`
    }

    return ''
  }

  printInterface(type: GraphQLInterfaceType): string {
    return `interface ${type.name} {\n${this.printFields(type)}\n}`
  }

  printUnion(type: GraphQLUnionType): string {
    return `union ${type.name} = ${type.getTypes().join(' | ')}`
  }

  printEnum(type: GraphQLEnumType): string {
    const values = type.getValues()

    return (
      `enum ${type.name} {\n${values.map((v) => `  ${v.name}`).join('\n')}\n` +
      `}`
    )
  }

  printInputObject(type: GraphQLInputObjectType): string {
    const fieldMap = type.getFields()
    const fields = Object.keys(fieldMap).map((fieldName) => fieldMap[fieldName])

    return `input ${type.name} {\n${fields
      .map((f) => `  ${this.printInputValue(f)}`)
      .join('\n')}\n}`
  }

  printFields(type: any) {
    const fieldMap = type.getFields()
    const fields = Object.keys(fieldMap).map((fieldName) => fieldMap[fieldName])
    const mappedFields: any = []

    fields.forEach((f) => {
      if (f.astNode) {
        mappedFields.push(`  ${print(f.astNode)}`)
      } else {
        mappedFields.push(`  ${f.name}${this.printArgs(f)}: ${f.type}`)
      }
    })

    return mappedFields.join('\n')
  }

  printArgs(fieldOrDirectives: any) {
    if (fieldOrDirectives.args.length === 0) {
      return ''
    }

    return `(${fieldOrDirectives.args
      .map((arg: any) => {
        let argDecl = `${arg.name}: ${arg.type}`

        if (!this.isNullish(arg.defaultValue)) {
          argDecl += ` = ${print(
            astFromValue(arg.defaultValue, arg.type) as ASTNode,
          )}`
        }

        return argDecl
      })
      .join(', ')})`
  }

  printInputValue(arg: any) {
    let argDecl = `${arg.name}: ${arg.type}`

    if (!this.isNullish(arg.defaultValue)) {
      const ast = astFromValue(arg.defaultValue, arg.type)

      argDecl += ` = ${print(ast as ASTNode)}`
    }

    return argDecl
  }
}
