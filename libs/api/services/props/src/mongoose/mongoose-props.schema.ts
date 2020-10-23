import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type PropsDocument = MongooseProps & Document

@Schema()
export class MongooseProps {
  static __name = 'props'

  @Prop()
  declare id: string

  @Prop(Object)
  declare values: object
}

export const MongoosePropsSchema = SchemaFactory.createForClass(MongooseProps)
