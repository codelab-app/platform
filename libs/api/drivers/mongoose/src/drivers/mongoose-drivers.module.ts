import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ApiConfig } from '@codelab/api/config'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<ApiConfig>) => {
        return {
          uri: config.get('mongoEndpoint'),
        }
      },
    }),
  ],
})
export class MongooseDriversModule {}
