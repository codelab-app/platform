import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Field extends Document {
  @Prop()
  name: string
}

export const AppSchema = SchemaFactory.createForClass(Field)
