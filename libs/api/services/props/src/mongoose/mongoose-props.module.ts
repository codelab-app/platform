import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { MongooseProps, MongoosePropsSchema } from './mongoose-props.schema'
import { ApiConfig, ApiConfigTypes } from '@codelab/api/providers/config'

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
    MongooseModule.forFeature([
      {
        name: MongooseProps.name,
        schema: MongoosePropsSchema,
      },
    ]),
  ],
})
export class MongoosePropsModule {}
