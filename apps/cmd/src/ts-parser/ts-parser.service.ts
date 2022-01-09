import { TestGetExport__AtomsFragment } from '@codelab/backend/modules/atom'
import { AtomType, PrimitiveTypeKind } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { TypeKind } from '@codelab/shared/codegen/graphql'
import { pascalCaseToWords } from '@codelab/shared/utils'
import { Injectable } from '@nestjs/common'
import { writeFileSync } from 'fs'
import { Command, Console } from 'nestjs-console'
import { compose } from 'ramda'
import {
  isBooleanNode,
  isLiteralNode,
  isNumericNode,
  isStringNode,
  isUndefinedNode,
  isUnionNode,
  Node as TypeNode,
  parseFromProgram,
  UnionNode,
} from 'typescript-to-proptypes'
import { v4 } from 'uuid'
import { createTsProgram } from './createTsProgram'

type TypeGraphFragment = TestGetExport__AtomsFragment['api']['typeGraph']
type TypeFragment = TypeGraphFragment['vertices'][0]

@Console({
  command: 'parse-ts',
  description: 'A command to parse ts types to interfaces',
})
@Injectable()
export class TsParserService {
  @Command({
    command: 'mui',
    options: [
      {
        flags: '-d, --dir <value>',
        required: true,
        description:
          'The root directory where MUI is downloaded, e.g. ~/material-ui',
      },
    ],
    description: "Parses the mui library's component props definitions",
  })
  async parseMui({ dir }: { dir: string }) {
    // For some reason when using the node_modules files we get all (200+) props, including base html props and events
    // Workaround is to download the library code locally and pass the directory to it using a cli option
    // This shouldn't be an issue since we do it ideally once per library

    const { componentFiles, program } = createTsProgram(dir)
    const data: Array<TestGetExport__AtomsFragment> = []
    const atomTypeValues = new Set(Object.values(AtomType))

    for (const componentFile of componentFiles) {
      const proptypes = parseFromProgram(componentFile, program, {
        shouldResolveObject: ({ name }) => {
          if (
            name.toLowerCase().endsWith('classes') ||
            name === 'theme' ||
            name.endsWith('Props')
          ) {
            return false
          }

          return undefined
        },
        checkDeclarations: true,
      })

      if (proptypes.body.length === 0) {
        return
      }

      const component = proptypes.body[0]

      const api: TestGetExport__AtomsFragment['api'] = {
        id: v4(),
        name: `${component.name} API`,
        typeKind: TypeKind.InterfaceType,
        typeGraph: {
          vertices: [],
          edges: [],
        },
      }

      api.typeGraph.vertices.push({
        id: api.id,
        name: api.name,
        typeKind: api.typeKind as any, // TODO remove after codegen
        __typename: 'InterfaceType',
      })

      for (const typeNode of component.types) {
        const type = pipeline(
          typeNode.propType,
          `${component.name} ${typeNode.name}`,
        )

        if (!type) {
          continue
        }

        api.typeGraph.vertices.push(type as any)
        api.typeGraph.edges.push({
          target: (type as any).id as string,
          source: api.id,
          id: v4(),
          name: pascalCaseToWords(typeNode.name),
          key: typeNode.name,
        })
      }

      if (component.name.endsWith('Root')) {
        // We don't have AtomTypes for those, not sure what's their purpose
        continue
      }

      const atomType = `Mui${component.name.replace(/\s/g, '')}`

      if (!atomTypeValues.has(atomType as any)) {
        throw new Error(`Can't find the atom type ${atomType}`)
      }

      data.push({
        id: v4(),
        name: `MUI ${component.name}`,
        type: atomType as any,
        api,
      })
    }

    const output = 'data/mui-atoms.json'
    writeFileSync(output, JSON.stringify(data, null, 2))
  }
}

type TypeNodePipe = (
  typeNode: TypeNode | UnionNode,
  name: string,
) => Maybe<Array<TypeFragment> | TypeFragment>

type TypeNodePipeFactory = (next: TypeNodePipe) => TypeNodePipe

const unknownPipe: TypeNodePipe = (typeNode, name) => {
  console.warn('Type is unknown', name, typeNode.type)

  return undefined
}

const string: TypeFragment = {
  id: v4(),
  __typename: 'PrimitiveType',
  name: PrimitiveTypeKind.String.toString(),
  typeKind: TypeKind.PrimitiveType,
  primitiveKind: PrimitiveTypeKind.String,
}

const float: TypeFragment = {
  id: v4(),
  __typename: 'PrimitiveType',
  name: PrimitiveTypeKind.Float.toString(),
  typeKind: TypeKind.PrimitiveType,
  primitiveKind: PrimitiveTypeKind.Float,
}

const bool: TypeFragment = {
  id: v4(),
  __typename: 'PrimitiveType',
  name: PrimitiveTypeKind.Boolean.toString(),
  typeKind: TypeKind.PrimitiveType,
  primitiveKind: PrimitiveTypeKind.Boolean,
}

const unionPipe: TypeNodePipeFactory = (next) => (typeNode, name) => {
  if (isUnionNode(typeNode)) {
    // Remove undefined nodes from unions, because we don't handle required/nonrequired types
    const types = typeNode.types.filter((t) => !isUndefinedNode(t))

    // If all union types are LiteralNode, we can say this is an enum
    if (types.every((t) => isLiteralNode(t))) {
      // If the LiteralNodes are true and false, then this is simply a boolean. No idea why they type a boolean as true | false
      if (
        types.length === 2 &&
        types.find((t) => isLiteralNode(t) && t.value === 'true') &&
        types.find((t) => isLiteralNode(t) && t.value === 'false')
      ) {
        return bool
      }

      return {
        __typename: 'EnumType',
        name,
        typeKind: TypeKind.EnumType,
        id: v4(),
        allowedValues: types
          .map((t) => {
            if (!isLiteralNode(t)) {
              return null
            }

            // the string values are stored as '"something"', booleans as 'true', etc.
            if (typeof t.value !== 'string') {
              return null
            }

            try {
              const val = eval(t.value)

              return {
                name: pascalCaseToWords(val),
                value: val,
                id: v4(),
              }
            } catch (e) {
              console.error('Error while parsing literal value', t.value)

              return null
            }
          })
          .filter((v) => v !== null) as any,
      }
    }

    // Since we don't have union type yet, only handle it if we have only 1 parsable type
    // TODO add union type handling when we support Union Types
    const piped = types
      .map((type) => pipeline(type, name))
      .filter(
        (type): type is TypeFragment | Array<TypeFragment> => type !== null,
      )

    if (piped.length === 0) {
      return piped[0]
    }
  }

  return next(typeNode, name)
}

const primitivePipe: TypeNodePipeFactory = (next) => {
  return (typeNode, name) => {
    if (isStringNode(typeNode)) {
      return string
    }

    if (isNumericNode(typeNode)) {
      return float
    }

    if (isBooleanNode(typeNode)) {
      return bool
    }

    return next(typeNode, name)
  }
}

// Not sure how to handle 'AnyNode' and 'ObjectNode' without any subfields, like classes
const pipeline = compose(unionPipe, primitivePipe)(unknownPipe)
