import { VertexType } from '@prisma/client'
import {
  CollectionOf,
  Default,
  Description,
  Enum,
  Optional,
  Property,
  Schema,
  Title,
  getJsonSchema,
} from '@tsed/schema'
import { PaginationProps as AntPaginationProps } from 'antd/lib/pagination'
import * as React from 'react'
import { JsonSchemaQuickJumperDependencies } from '../../../../../../backend/src/common/decorators/JsonSchemaQuickJumperDependencies'

@JsonSchemaQuickJumperDependencies()
class Props implements AntPaginationProps {
  @Optional()
  @Description('Current page number')
  current?: number

  @Optional()
  @Default(1)
  @Description('Default initial page number')
  defaultCurrent?: number

  @Optional()
  @Default(10)
  @Description('Default number of data items per page')
  defaultPageSize?: number

  @Optional()
  @Description('Disable pagination')
  disabled?: boolean

  @Optional()
  @Description('Whether to hide pager on single page')
  hideOnSinglePage?: boolean
  // itemRender?: (page: number, type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next', originalElement: React.ReactElement<HTMLElement>) => React.ReactNode;

  @Optional()
  @Description('Number of data items per page')
  pageSize?: number

  @CollectionOf(String)
  @Default(['10', '20', '50', '100'])
  @Description('Specify the sizeChanger options')
  pageSizeOptions?: Array<string>

  @Optional()
  @Description(
    'If size is not specified, Pagination would resize according to the width of the window',
  )
  responsive?: boolean

  @Optional()
  @Description('Show less page items')
  showLessItems?: boolean

  @Optional()
  @Property('boolean')
  @Description('Determine whether you can jump to pages directly')
  showQuickJumper?:
    | boolean
    | {
        goButton?: React.ReactNode
      }

  @Optional()
  @Description(
    'Determine whether to show pageSize select, it will be true when total > 50',
  )
  showSizeChanger?: boolean

  @Optional()
  @Description("Show page item's title")
  showTitle?: boolean

  // showTotal?: (total: number, range: [number, number]) => React.ReactNode;

  @Optional()
  @Description('Whether to use simple mode')
  simple?: boolean

  @Optional()
  @Default('default')
  @Enum('default', 'small')
  @Description('Specify the size of Pagination, can be set to small')
  size?: 'default' | 'small'

  @Optional()
  @Default(0)
  @Description('Total number of data items')
  total?: number

  // onChange?: (page: number, pageSize?: number) => void;

  // onShowSizeChange?: (current: number, size: number) => void;
}

export class PaginationProps {
  @Property()
  @Enum(VertexType.React_Pagination)
  declare type: string

  @Schema(getJsonSchema(Props, { customKeys: true }))
  @Title('')
  declare props: object
}
