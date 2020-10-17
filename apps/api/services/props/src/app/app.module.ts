import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ApiConfig, ConfigModule } from '@codelab/api/config'
import { RestifyModule } from '@codelab/api/restify'

@Module({
  imports: [
    ConfigModule,
    RestifyModule,
    MongooseModule.forRootAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: (config: ConfigService<ApiConfig>) => {
        return {
          uri: config.get('mongoEndpoint'),
        }
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
