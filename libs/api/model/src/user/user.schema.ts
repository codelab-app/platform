import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class User extends Document {
  name: 'User'

  @Prop()
  username: string

  @Prop()
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User)
