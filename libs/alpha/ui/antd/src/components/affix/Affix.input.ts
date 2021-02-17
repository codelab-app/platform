import { VertexType } from '@prisma/client'
import {
  Default,
  Description,
  Enum,
  Optional,
  Property,
  Schema,
  Title,
  getJsonSchema,
} from '@tsed/schema'
import { AffixProps as AntAffixProps } from 'antd/lib/affix'

class Props implements Omit<AntAffixProps, 'children'> {
  @Optional()
  @Property('string')
  @Description('Offset from the bottom of the viewport (in pixels)')
  offsetBottom?: number

  @Optional()
  @Default(0)
  @Property('string')
  @Description('Offset from the top of the viewport (in pixels)')
  offsetTop?: number

  // onChange?: (affixed?: boolean) => void;
  // target?: () => Window | HTMLElement | null;
}

export class AffixProps {
  @Property()
  @Enum(VertexType.React_Affix)
  declare type: string

  @Schema(getJsonSchema(Props, { customKeys: true }))
  @Title('')
  declare props: object
}
