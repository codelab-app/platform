import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ApiConfig, ApiConfigTypes } from '@codelab/api/config'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<ApiConfig>) => {
        return {
          uri: config.get(ApiConfigTypes.MONGO_ENDPOINT),
        }
      },
    }),
  ],
})
export class MongooseDriversModule {}
