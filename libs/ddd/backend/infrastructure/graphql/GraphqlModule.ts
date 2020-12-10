import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { GraphqlConfig } from './config/GraphqlConfig'

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GraphqlConfig,
    }),
  ],
})
export class GraphqlModule {}
