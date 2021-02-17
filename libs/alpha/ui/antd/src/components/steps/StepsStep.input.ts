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
import { StepProps as AntStepProps } from 'antd/lib/steps'
import * as React from 'react'

class Props implements AntStepProps {
  @Optional()
  @Property('string')
  @Description('Description of the step, optional property')
  description?: React.ReactNode

  @Optional()
  @Description('Disable click')
  disabled?: boolean

  @Optional()
  @Property('string')
  @Description('Icon of the step, optional property')
  icon?: React.ReactNode

  @Optional()
  @Default('wait')
  @Enum('wait', 'process', 'finish', 'error')
  @Description(
    'To specify the status. It will be automatically set by current of Steps if not configured. Optional values are: wait process finish error',
  )
  status?: 'wait' | 'process' | 'finish' | 'error'

  @Optional()
  @Property('string')
  @Description('Subtitle of the step')
  subTitle?: React.ReactNode

  @Optional()
  @Property('string')
  @Description('Title of the step')
  title?: React.ReactNode
}

export class StepsStepProps {
  @Property()
  @Enum(VertexType.React_Steps_Step)
  declare type: string

  @Schema(getJsonSchema(Props, { customKeys: true }))
  @Title('')
  declare props: object
}
