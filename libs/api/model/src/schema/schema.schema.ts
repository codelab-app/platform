import { Prop, Schema as MongooseSchema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@MongooseSchema()
export class Schema extends Document {
  @Prop()
  name: string
}

export const SchemaSchema = SchemaFactory.createForClass(Schema)
