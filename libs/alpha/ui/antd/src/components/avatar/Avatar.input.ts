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
import { AvatarProps as AntAvatarProps } from 'antd/lib/avatar'
import { AvatarSize } from 'antd/lib/avatar/SizeContext'
import * as React from 'react'

class AvatarSizeProps implements AntAvatarProps {
  @Optional()
  @Enum('large', 'small', 'default')
  size?: 'large' | 'small' | 'default'

  @Optional()
  @Enum('xxl')
  xxl?: 'xxl'

  @Optional()
  @Enum('xl')
  xl?: 'xl'

  @Optional()
  @Enum('lg')
  lg?: 'lg'

  @Optional()
  @Enum('md')
  md?: 'md'

  @Optional()
  @Enum('sm')
  sm?: 'sm'

  @Optional()
  @Enum('xs')
  xs?: 'xs'
}

export class AvatarProps implements AntAvatarProps {
  @Optional()
  @Description(
    'This attribute defines the alternative text describing the image',
  )
  alt?: string

  @Optional()
  @Property('number')
  @Description('Letter type unit distance between left and right sides')
  gap?: number

  @Optional()
  @Property('string')
  @Description('Custom icon type for an icon avatar')
  icon?: React.ReactNode

  @Optional()
  @Default('circle')
  @Enum('circle', 'square')
  @Description('The shape of avatar')
  shape?: 'circle' | 'square'

  @Optional()
  @Schema(getJsonSchema(AvatarSizeProps))
  @Title('Avatar Size')
  @Description('The size of the avatar')
  size?: AvatarSize

  @Optional()
  @Property('string')
  @Description('The address of the image for an image avatar or image element')
  src?: React.ReactNode

  @Optional()
  @Description('A list of sources to use for different screen resolutions')
  srcSet?: string

  // onError?: () => boolean;
}

export class AvatarSelectedProps {
  @Property()
  @Enum(VertexType.React_Avatar)
  declare type: string

  @Schema(getJsonSchema(AvatarProps, { customKeys: true }))
  @Title('')
  declare props: object
}
