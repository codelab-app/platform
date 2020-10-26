import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MongooseProps, MongoosePropsSchema } from './mongoose-props.schema'
import { MongoosePropsService } from './mongoose-props.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MongooseProps.__name,
        schema: MongoosePropsSchema,
      },
    ]),
  ],
  controllers: [MongoosePropsService],
  providers: [MongoosePropsService],
  exports: [MongoosePropsService],
})
export class MongoosePropsModule {}
