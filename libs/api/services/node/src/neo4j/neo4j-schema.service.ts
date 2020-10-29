import { buildFederatedSchema } from '@apollo/federation'
import {Injectable, Logger} from '@nestjs/common'
import {
  buildSchema,
  GraphQLField,
  GraphQLObjectType,
  GraphQLSchema,
  isSpecifiedDirective,
  isSpecifiedScalarType,
  parse,
  ObjectTypeDefinitionNode,
  print,
  visit,
  printIntrospectionSchema,
  GraphQLDirective,
  DirectiveLocation,
  astFromValue,
  GraphQLScalarType,
  GraphQLInterfaceType, GraphQLUnionType, GraphQLEnumType, GraphQLInputObjectType, GraphQLType
} from 'graphql'
import { getDirectives } from "@graphql-tools/utils";

import { printSchema } from 'graphql/utilities'
import { makeAugmentedSchema } from 'neo4j-graphql-js'
import { extractResolversFromSchema } from 'neo4j-graphql-js/dist/augment/resolvers'
import { makeExecutableSchema, mergeSchemas } from "graphql-tools";
import * as fs from 'fs';

import {SchemaDirectiveVisitor} from "graphql-tools/dist/schemaVisitor"
import {UpperCaseDirective} from "../graphql"
import {SchemaDefinitionNode} from "graphql/language/ast"
import {mixed} from "utility-types/dist/utility-types"

class FuckYouNestJsGraphql {
  constructor() {
  }
  printSchemaWithDirectives(schema: any) {
    const directives = schema.getDirectives();
    const typeMap = schema.getTypeMap();
    const types = Object.keys(typeMap)
        .filter(k => !k.match(/^__/))
        .sort((name1, name2) => name1.localeCompare(name2))
        .map(typeName => typeMap[typeName]);

    const m = types.map(type => {
      if (type instanceof GraphQLScalarType) {
        // return this.printScalar(type);
        return '';
      } else if (type instanceof GraphQLObjectType) {
        return this.printObject(type);
      } else if (type instanceof GraphQLInterfaceType) {
        return this.printInterface(type);
      } else if (type instanceof GraphQLUnionType) {
        return this.printUnion(type);
      } else if (type instanceof GraphQLEnumType) {
        return this.printEnum(type);
      }
      if (type instanceof GraphQLInputObjectType)
        return this.printInputObject(type as GraphQLInputObjectType);
    });
    // Logger.log(m);
    // return [this.printSchemaDefinition(schema)].concat(
    //     directives.map((directive: GraphQLDirective) => {
    //       return 'directive @' + directive.name + this.printArgs(directive) +
    //           ' on ' + directive.locations.join(' | ');
    //     }), m).join('\n\n') + '\n';
    return [this.printSchemaDefinition(schema)].concat(m).join('\n\n') + '\n';

  }

  printSchemaDefinition(schema: GraphQLSchema): string {
    const operationTypes = [];

    const queryType = schema.getQueryType();
    if (queryType) {
      operationTypes.push(`  query: ${queryType}`);
    }

    const mutationType = schema.getMutationType();
    if (mutationType) {
      operationTypes.push(`  mutation: ${mutationType}`);
    }

    const subscriptionType = schema.getSubscriptionType();
    if (subscriptionType) {
      operationTypes.push(`  subscription: ${subscriptionType}`);
    }

    return `schema {\n${operationTypes.join('\n')}\n}`;
  }

  printType(type: GraphQLType): string {
    if (type instanceof GraphQLScalarType) {
      return this.printScalar(type);
    } else if (type instanceof GraphQLObjectType) {
      return this.printObject(type);
    } else if (type instanceof GraphQLInterfaceType) {
      return this.printInterface(type);
    } else if (type instanceof GraphQLUnionType) {
      return this.printUnion(type);
    } else if (type instanceof GraphQLEnumType) {
      return this.printEnum(type);
    }
    if (type instanceof GraphQLInputObjectType)
      return this.printInputObject(type as GraphQLInputObjectType);
  }

  invariant(condition: mixed, message?: string) {
    if (!condition) {
      throw new Error(message);
    }
  }

  isNullish(value: mixed): boolean {
    return value === null || value === undefined || value !== value;
  }

  printScalar(type: GraphQLScalarType): string {
    return `scalar ${type.name}`;
  }

  printObject(type: GraphQLObjectType): string {
    if (typeof type !== 'undefined') {

      const interfaces = type.getInterfaces();
      const implementedInterfaces = interfaces.length ?
          ' implements ' + interfaces.map(i => i.name).join(', ') : '';
      return `type ${type.name}${implementedInterfaces} {\n` +
          this.printFields(type) + '\n' +
          '}';
    }
  }

  printInterface(type: GraphQLInterfaceType): string {
    return `interface ${type.name} {\n` +
        this.printFields(type) + '\n' +
        '}';
  }

  printUnion(type: GraphQLUnionType): string {
    return `union ${type.name} = ${type.getTypes().join(' | ')}`;
  }

  printEnum(type: GraphQLEnumType): string {
    const values = type.getValues();
    return `enum ${type.name} {\n` +
        values.map(v => '  ' + v.name).join('\n') + '\n' +
        '}';
  }

  printInputObject(type: GraphQLInputObjectType): string {
    const fieldMap = type.getFields();
    const fields = Object.keys(fieldMap).map(fieldName => fieldMap[fieldName]);
    return `input ${type.name} {\n` +
        fields.map(f => '  ' + this.printInputValue(f)).join('\n') + '\n' +
        '}';
  }

  printFields(type: any) {
    const fieldMap = type.getFields();
    const fields = Object.keys(fieldMap).map(fieldName => fieldMap[fieldName]);
    const mappedFields: any = [];
    fields.forEach(f => {
      if (f.astNode) {
        mappedFields.push(print(f.astNode))
      } else {
        mappedFields.push(`  ${f.name}${this.printArgs(f)}: ${f.type}`)
      }
    });
    return mappedFields.join('\n')
  }

  printArgs(fieldOrDirectives: any) {
    if (fieldOrDirectives.args.length === 0) {
      return '';
    }
    return '(' + fieldOrDirectives.args.map((arg: any) => {
      let argDecl = `${arg.name}: ${arg.type}`;
      if (!this.isNullish(arg.defaultValue)) {
        argDecl += ` = ${print(astFromValue(arg.defaultValue, arg.type))}`;
      }
      return argDecl;
    }).join(', ') + ')';
  }

  printInputValue(arg: any) {
    let argDecl = `${arg.name}: ${arg.type}`;
    if (!this.isNullish(arg.defaultValue)) {
      argDecl += ` = ${print(astFromValue(arg.defaultValue, arg.type))}`;
    }
    return argDecl;
  }

  printDirective(directive: any) {
    return 'directive @' + directive.name + this.printArgs(directive) +
        ' on ' + directive.locations.join(' | ');
  }
}

class RelationDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: GraphQLField<any, any>) {
    // if (field.name === 'node') {
    //   // Logger.log(this.args);
    //   // Logger.log(field.astNode.directives);
    //   // field.isDeprecated = true;
    // }
    return field;
    // field.deprecationReason = this.args.reason;
  }

  public visitObject(object: GraphQLObjectType<any, any>): GraphQLObjectType<any, any> | void | null {
    // Logger.log(object);
    return super.visitObject(object);
  }
}

@Injectable()
export class Neo4jSchemaService {

  /**
   * Augment schema with Neo4j + Federation
   *
   * @param schema Nest.js code first schema
   */
  transformSchema(schema: GraphQLSchema) {
    const visited = SchemaDirectiveVisitor.visitSchemaDirectives(schema, {
      relation: RelationDirective
    });
    // Logger.log(visited.relation[0].visitedType.astNode);

    const RelDirective = new GraphQLDirective({
      name: 'relation',
      description: 'Provides default value for input field.',
      locations: [DirectiveLocation.FIELD_DEFINITION],
    });
    const sWithDirective = new GraphQLSchema({
      directives: [RelDirective]
    });

    const schemaDirectives = {
      relation: UpperCaseDirective
    };
    const s = mergeSchemas({
      schemas: [schema, sWithDirective],
      mergeDirectives: true
    });
    s.astNode = visited.relation[0].visitedType.astNode as SchemaDefinitionNode;
    // Logger.log(print(visited.relation[0].visitedType.astNode));
    // Logger.log(print(s.astNode));
    const fuk = new FuckYouNestJsGraphql();
    Logger.log('hello ' + fuk.printSchemaWithDirectives(s));

    const resolvers = extractResolversFromSchema(schema)
    // Logger.log(resolvers);

    // Our user defined schema
    // const typeDefs: string = printSchema(schema)
    const typeDefs: string = fuk.printSchemaWithDirectives(s)

//     const typeDefs = `
//     type Node {
//   id: ID!
//   type: NodeType!
//   node: Node! @relation(name: "parent", direction: "OUT")
// }
//
// enum NodeType {
//   REACT_BUTTON
//   REACT_DIV
// }
//
// type Query {
//   node: Node!
// }
//
// type Mutation {
//   nodeCreate(input: NodeCreateInput!): Node!
// }
//
// input NodeCreateInput {
//   type: NodeType!
// }
// `

    // const regex = /type Node {id: ID! type: NodeType! node: Node! }/g;
    // const regex = /type Node {id: ID! type: NodeType! node: Node! }/g;
    // const found = typeDefs.match(regex);


    // const d = getDirectives(schema, schema);
    // Logger.log(typeDefs);
    const neo4jExtendedSchema = makeAugmentedSchema({
      // schema,
      resolvers,
      typeDefs,
      config: {
        isFederated: true,
      },
    })
    // fs.writeFileSync('neo4jExtendedSchema', JSON.stringify(
    //     neo4jExtendedSchema));
    // Logger.log(neo4jExtendedSchema);
    const fd = buildFederatedSchema([neo4jExtendedSchema])
    // Logger.log(printSchema(fd));
    return fd
  }
}
