import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type PropsDocument = Props & Document

@Schema()
export class Props {
  static __name = 'props'

  @Prop()
  declare id: string

  @Prop(Object)
  declare values: object
}

export const PropsSchema = SchemaFactory.createForClass(Props)
