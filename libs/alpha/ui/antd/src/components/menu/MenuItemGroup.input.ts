import { VertexType } from '@prisma/client'
import {
  Description,
  Enum,
  Optional,
  Property,
  Schema,
  Title,
  getJsonSchema,
} from '@tsed/schema'
import { ReactNode } from 'react'
import { JsonSchemaArray } from '../../../../../../backend/src/common/decorators/JsonSchemaArray'
import { MenuItemProps } from './MenuItem.input'

class Props {
  @JsonSchemaArray(MenuItemProps)
  @Title('Children of type MenuItem')
  children?: any

  @Optional()
  @Property('string')
  @Description('The title of the group')
  title?: ReactNode
}

export class MenuItemGroupProps {
  @Property()
  @Enum(VertexType.React_Menu_ItemGroup)
  declare type: string

  @Schema(getJsonSchema(Props, { customKeys: true }))
  @Title('')
  declare props: object
}
