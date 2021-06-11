import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import path from 'path'
import { graphqlConfig } from './config/graphql.config'
import { GraphqlService } from './graphql.service'

describe('GraphqlService', () => {
  let service: GraphqlService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(graphqlConfig)],
      providers: [GraphqlService],
    }).compile()

    service = module.get<GraphqlService>(GraphqlService)
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
