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
import { StepsProps as AntStepsProps } from 'antd/lib/steps'

class Props implements AntStepsProps {
  @Optional()
  @Description('Additional class to Steps')
  className?: string

  @Optional()
  @Description(
    'To set the current step, counting from 0. You can overwrite this state by using status of Step',
  )
  current?: number

  @Optional()
  @Default('horizontal')
  @Enum('horizontal', 'vertical')
  @Description(
    'To specify the direction of the step bar, horizontal or vertical',
  )
  direction?: 'horizontal' | 'vertical'

  @Optional()
  @Default(0)
  @Description('Set the initial step, counting from 0')
  initial?: number

  @Optional()
  @Default('horizontal')
  @Enum('horizontal', 'vertical')
  @Description(
    'Place title and description with horizontal or vertical direction',
  )
  labelPlacement?: 'horizontal' | 'vertical'

  @Optional()
  @Description(
    'Progress circle percentage of current step in process status (only works on basic Steps)',
  )
  percent?: number

  @Optional()
  @Property('boolean')
  @Description(
    'Steps with progress dot style, customize the progress dot by setting it to a function. labelPlacement will be vertical',
  )
  progressDot?: boolean | Function

  @Optional()
  @Description(
    'change to vertical direction when screen width smaller than 532px',
  )
  responsive?: boolean

  @Optional()
  @Default('default')
  @Enum('default', 'small')
  @Description(
    'To specify the size of the step bar, default and small are currently supported',
  )
  size?: 'default' | 'small'

  @Optional()
  @Default('process')
  @Enum('wait', 'process', 'finish', 'error')
  @Description(
    'To specify the status of current step, can be set to one of the following values: wait process finish error',
  )
  status?: 'wait' | 'process' | 'finish' | 'error'

  @Optional()
  @Default('default')
  @Enum('default', 'navigation')
  @Description(
    'Type of steps, can be set to one of the following values: default, navigation',
  )
  type?: 'default' | 'navigation'

  // onChange?: (current: number) => void;
}

export class StepsProps {
  @Property()
  @Enum(VertexType.React_Steps)
  declare type: string

  @Schema(getJsonSchema(Props, { customKeys: true }))
  @Title('')
  declare props: object
}
