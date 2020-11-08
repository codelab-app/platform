import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { HasuraService } from './hasura.service'
import { ConfigModule } from '@codelab/api/providers/config'

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useClass: HasuraService,
      inject: [ConfigService],
    }),
  ],
})
export class HasuraModule {}
