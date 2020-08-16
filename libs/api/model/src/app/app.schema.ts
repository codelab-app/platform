import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class App extends Document {
  @Prop()
  name: string
}

export const AppSchema = SchemaFactory.createForClass(App)
