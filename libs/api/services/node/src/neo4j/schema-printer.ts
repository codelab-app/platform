import { Logger } from '@nestjs/common'
import {
  ASTNode,
  GraphQLDirective,
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
import { DirectiveNode } from 'graphql/language/ast'

export interface ISchemaPrinterConfig {
  excludeScalar?: boolean
  includeSpecificScalarTypes?: Array<string>
  excludeDirectives?: boolean
  excludeObjectType?: boolean
  excludeInterfaceType?: boolean
  excludeUnionType?: boolean
  excludeEnumType?: boolean
  excludeInputObjectType?: boolean
}

export class SchemaPrinter {
  config: ISchemaPrinterConfig = {
    excludeScalar: false,
    excludeDirectives: false,
    excludeObjectType: false,
    excludeInterfaceType: false,
    excludeUnionType: false,
    excludeEnumType: false,
    excludeInputObjectType: false,
    includeSpecificScalarTypes: [],
  }

  constructor(config?: ISchemaPrinterConfig) {
    if (config) {
      this.config = { ...config }
    }
  }

  printSchemaWithDirectives(schema: any) {
    const directives = schema.getDirectives()
    const typeMap = schema.getTypeMap()
    const types = Object.keys(typeMap)
      .filter((k) => !k.match(/^__/))
      .sort((name1, name2) => name1.localeCompare(name2))
      .map((typeName) => typeMap[typeName])

    const typesList: Array<string> = types.map((type) => {
      if (type instanceof GraphQLScalarType) {
        return this.config.excludeScalar ? '' : this.printScalar(type)
      }

      if (type instanceof GraphQLObjectType) {
        return this.config.excludeObjectType ? '' : this.printObject(type)
      }

      if (type instanceof GraphQLInterfaceType) {
        return this.config.excludeInterfaceType ? '' : this.printInterface(type)
      }

      if (type instanceof GraphQLUnionType) {
        return this.config.excludeUnionType ? '' : this.printUnion(type)
      }

      if (type instanceof GraphQLEnumType) {
        return this.config.excludeEnumType ? '' : this.printEnum(type)
      }

      if (type instanceof GraphQLInputObjectType) {
        return this.config.excludeInputObjectType
          ? ''
          : this.printInputObject(type as GraphQLInputObjectType)
      }

      return ''
    })
    let directiveList = []

    if (!this.config.excludeDirectives) {
      directiveList = directives.map((directive: GraphQLDirective) => {
        return `directive @${directive.name}${this.printArgs(
          directive,
        )} on ${directive.locations.join(' | ')}`
      })
    }

    return [this.printSchemaDefinition(schema)]
      .concat(typesList, directiveList)
      .join('\n')
  }

  printSchemaDefinition(schema: GraphQLSchema): string {
    const operationTypes = []

    const queryType = schema.getQueryType()

    if (queryType) {
      operationTypes.push(`  query: ${queryType}`)
    }

    const mutationType = schema.getMutationType()

    if (mutationType) {
      operationTypes.push(`  mutation: ${mutationType}\n`)
    }

    const subscriptionType = schema.getSubscriptionType()

    if (subscriptionType) {
      operationTypes.push(`  subscription: ${subscriptionType}`)
    }

    return `schema {\n${operationTypes.join('\n')}\n}`
  }

  invariant(condition: any, message?: string) {
    if (!condition) {
      throw new Error(message)
    }
  }

  isNullish(value: any): boolean {
    return value === null || value === undefined
  }

  printScalar(type: GraphQLScalarType): string {
    if (this.config.includeSpecificScalarTypes?.includes(type.name)) {
      return `scalar ${type.name}`
    }

    return ''
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
        const directives = this.printDirectives(f.astNode.directives)

        Logger.log(this.printDirectives(f.astNode.directives), 'printFields')
        // mappedFields.push(`  ${print(f.astNode)}`)
        mappedFields.push(
          `  ${f.name}${this.printArgs(f)}: ${f.type} ${this.printDirectives(
            f.astNode.directives,
          )}`,
        )
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

  private printDirectives(directives: ReadonlyArray<DirectiveNode>): string {
    const res: Array<any> = []

    directives.forEach((dir) => {
      const name = dir.name.value
      const args = dir.arguments

      if (args) {
        const argString = args
          .map((arg) => {
            if (arg.value.kind === 'StringValue') {
              return `${arg.name.value}: "${arg.value.value}"`
            }

            return ''
          })
          .join(', ')

        res.push(`@${name}(${argString})`)
      }
    })

    return res.join(' ')
  }
}
