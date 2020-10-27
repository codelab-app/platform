import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { NodeType, NodeTypeLiteral } from '@codelab/api/services/node'

export type PropsDocument = MongooseProps & Document

@Schema()
export class MongooseProps {
  // @Prop()
  // declare name: string
  // name = 'props'
  static __name = 'props'

  @Prop()
  declare id: string

  @Prop(Object)
  declare values: object

  @Prop(NodeTypeLiteral)
  declare type: NodeType
}

export const MongoosePropsSchema = SchemaFactory.createForClass(MongooseProps)

MongoosePropsSchema.methods.toJSON = function () {
  const { __v, _id, ...props } = this.toObject()

  props.id = _id

  return props
}
