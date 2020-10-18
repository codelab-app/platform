import { join } from 'path'
import { Module } from '@nestjs/common'
import { GraphQLFederationModule } from '@nestjs/graphql'
import { PropsResolver } from './props.resolver'
import { PropsService } from './props.service'
import { Node } from '@codelab/api/schema/node'

@Module({
  imports: [
    GraphQLFederationModule.forRoot({
      autoSchemaFile: join(
        process.cwd(),
        'apps/api/services/props/src/schema.gql',
      ),
      buildSchemaOptions: { orphanedTypes: [Node] },
    }),
  ],
  providers: [PropsResolver, PropsService],
})
export class PropsModule {}
