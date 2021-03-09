import { Field, InputType } from '@nestjs/graphql'
import { VertexType } from '@prisma/client'
import { MinLength } from '@tsed/schema'
import { GraphQLJSONObject } from 'graphql-type-json'
import { ButtonProps } from '@codelab/antd'
import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';
import { CardProps } from '../../../../../../../alpha/ui/antd/src/components/card/Card.input';
import { CardGridProps } from '../../../../../../../alpha/ui/antd/src/components/card/CardGrid.input';
import { CardMetaProps } from '../../../../../../../alpha/ui/antd/src/components/card/CardMeta.input';
import { IconProps } from '../../../../../../../alpha/ui/antd/src/components/icon/Icon.input';
import { DividerProps } from '../../../../../../../alpha/ui/antd/src/components/divider/Divider.input';
import { LayoutProps } from '../../../../../../../alpha/ui/antd/src/components/layout/Layout.input';
import { LayoutSiderProps } from '../../../../../../../alpha/ui/antd/src/components/layout/LayoutSider.input';
import { SpaceProps } from '../../../../../../../alpha/ui/antd/src/components/space/Space.input';
import { AffixProps } from '../../../../../../../alpha/ui/antd/src/components/affix/Affix.input';


@InputType()
// @JsonSchemaTypeDependencies(PropsList)
@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class UpdateVertexInput {
  @Field()
  @MinLength(3)
  @RjsfGridProp({ row: 0, span: 24, required: true })
  declare vertexId: string

  @Field(() => String, { nullable: true })
  @RjsfGridProp({ row: 1, span: 24, required: true, enum: VertexType })
  declare type?: VertexType

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Button props: ',
    condition: {key: 'type', value: VertexType.React_Button},
    clazz: ButtonProps
  })
  declare buttonProps: ButtonProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Card props: ',
    condition: {key: 'type', value: VertexType.React_Card},
    clazz: CardProps
  })
  declare cardProps: CardProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Card Grid Props: ',
    condition: {key: 'type', value: VertexType.React_Card_Grid},
    clazz: CardGridProps
  })
  declare cardGridProps: CardGridProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Card Meta Props: ',
    condition: {key: 'type', value: VertexType.React_Card_Meta},
    clazz: CardMetaProps
  })
  declare cardMetaProps: CardMetaProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Icon Props: ',
    condition: {key: 'type', value: VertexType.React_Icon},
    clazz: IconProps
  })
  declare iconProps: IconProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Divider Props: ',
    condition: {key: 'type', value: VertexType.React_Divider},
    clazz: DividerProps
  })
  declare dividerProps: DividerProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Layout Props: ',
    condition: {key: 'type', value: VertexType.React_Layout},
    clazz: LayoutProps
  })
  declare layoutProps: LayoutProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Layout Header Props: ',
    condition: {key: 'type', value: VertexType.React_Layout_Header},
    clazz: LayoutProps
  })
  declare layoutHeaderProps: LayoutProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Layout Footer Props: ',
    condition: {key: 'type', value: VertexType.React_Layout_Footer},
    clazz: LayoutProps
  })
  declare layoutFooterProps: LayoutProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Layout Content Props: ',
    condition: {key: 'type', value: VertexType.React_Layout_Content},
    clazz: LayoutProps
  })
  declare layoutContentProps: LayoutProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Layout Sider Props: ',
    condition: {key: 'type', value: VertexType.React_Layout_Sider},
    clazz: LayoutSiderProps
  })
  declare layoutSiderProps: LayoutSiderProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Space Props: ',
    condition: {key: 'type', value: VertexType.React_Space},
    clazz: SpaceProps
  })
  declare spaceProps: SpaceProps

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Affix Props: ',
    condition: {key: 'type', value: VertexType.React_Affix},
    clazz: AffixProps
  })
  declare affixProps: AffixProps

  @Field(() => GraphQLJSONObject, { nullable: true })
  declare props?: object
}
