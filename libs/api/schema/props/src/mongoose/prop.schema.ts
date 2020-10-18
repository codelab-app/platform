import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type PropsDocument = Props & Document

@Schema()
export class Props {
  @Prop()
  declare id: string

  @Prop(Object)
  declare props: number
}

export const CatSchema = SchemaFactory.createForClass(Props)
