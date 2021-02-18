import { VertexType } from '@prisma/client'
import { Enum, Property, Schema, Title, getJsonSchema } from '@tsed/schema'
import { RGLItemProps } from '@codelab/antd'

export class ReactRGLContainerSelected {
  @Property()
  @Enum(VertexType.React_RGL_Container)
  declare type: string

  @Schema(getJsonSchema(RGLItemProps))
  @Title('')
  declare props: object
}
