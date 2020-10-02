import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

@Schema()
export class Node extends mongoose.Document {
  name = 'Node'

  @Prop({ required: true })
  type?: string

  @Prop({ type: mongoose.Schema.Types.Mixed })
  props?: object

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Node' })
  parent?: mongoose.Schema.Types.ObjectId | null

  // @Prop([Node])
  // children: Array<Node>
}

export const NodeSchema = SchemaFactory.createForClass(Node)
