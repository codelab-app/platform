import { join } from 'path'
import { Module } from '@nestjs/common'
import { GraphQLFederationModule } from '@nestjs/graphql'
import { Node } from './model'
import { PropsService } from './props.service'
import { NodesResolver, PropsResolver } from './resolvers'

@Module({
  imports: [
    GraphQLFederationModule.forRootAsync({
      useFactory: () => {
        return {
          autoSchemaFile: join(
            process.cwd(),
            'apps/api/services/props/src/schema.gql',
          ),
          // here provide all the types that are missing in schema
          // since we're not importing .graphql typedefs
          buildSchemaOptions: { orphanedTypes: [Node] },
          // formatError: (error) => {
          //   console.error('error', error)
          //
          //   return error
          // },
        }
      },
    }),
  ],
  providers: [PropsResolver, NodesResolver, PropsService],
})
export class PropsModule {}
