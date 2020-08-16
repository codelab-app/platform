import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { App, AppSchema } from '../app/app.schema'

@Schema()
export class User extends Document {
  name: 'User'

  @Prop()
  username: string

  @Prop()
  password: string

  @Prop([{ type: AppSchema }])
  apps: Array<App>
}

export const UserSchema = SchemaFactory.createForClass(User)
