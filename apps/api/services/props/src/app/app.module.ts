import { join } from 'path'
import { Module } from '@nestjs/common'
import { GraphQLFederationModule } from '@nestjs/graphql'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@codelab/api/config'
import { Node, PropsModule } from '@codelab/api/schema/props'

@Module({
  imports: [
    GraphQLFederationModule.forRootAsync({
      useFactory: () => {
        return {
          include: [PropsModule],
          autoSchemaFile: join(
            process.cwd(),
            'apps/api/services/props/src/schema.gql',
          ),
          // here provide all the types that are missing in schema
          // since we're not importing .graphql typedefs
          buildSchemaOptions: { orphanedTypes: [Node] },
        }
      },
    }),
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
