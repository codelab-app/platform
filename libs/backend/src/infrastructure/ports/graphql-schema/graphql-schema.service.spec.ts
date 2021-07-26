import { Test, TestingModule } from '@nestjs/testing'
import path from 'path'
import { dgraphConfig, DgraphTokens } from '../dgraph'
import { graphqlSchemaConfig } from './config/graphql-schema.config'
import { GraphqlSchemaTokens } from './config/graphql-schema.tokens'
import { GraphqlSchemaService } from './graphql-schema.service'

describe('GraphqlService', () => {
  let service: GraphqlSchemaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: GraphqlSchemaTokens.GraphqlSchemaConfig,
          useValue: graphqlSchemaConfig(),
        },
        { provide: DgraphTokens.DgraphConfig, useValue: dgraphConfig() },
        GraphqlSchemaService,
      ],
    }).compile()

    service = module.get<GraphqlSchemaService>(GraphqlSchemaService)
  })

  it('should load graphql schema', () => {
    const testSchema = service.loadGraphqlSchema(
      path.resolve(__dirname, 'test/demo.graphql'),
    )

    expect(testSchema[0]).toBe(`type atom {
  id: ID!
}

enum AtomTypeAnother {
  AntDesignAffix
}

enum AtomType {
  AntDesignAffix
  AntDesignAlert
}

enum AtomTypeAnother {
  AntDesignAffix
}

input AppFilter {
  id: [ID!]
  ownerId: StringHashFilter
}
`)
  })

  it('should get enum typeDef from a string', () => {
    const testSchema = service.loadGraphqlSchema(
      path.resolve(__dirname, 'test/demo.graphql'),
    )

    const enumType = service.getEnumTypeDef('AtomType', testSchema[0])

    const expectedEnumType = `enum AtomType {
  AntDesignAffix
  AntDesignAlert
}`

    expect(enumType).toBe(expectedEnumType)
  })
})
