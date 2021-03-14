import { JsfProperty } from '../decorators/JsfProperty'
import { Jsf } from '../decorators/Jsf';

@Jsf({
  title: 'Tasks'
})
class Task {
  @JsfProperty({
    type: 'string',
    title: 'Title',
    description: 'A sample title',
    required: true,
  })
  declare title: string

  @JsfProperty({
    type: 'string',
    title: 'Task details',
    description: 'Enter the task details',
  })
  declare details: string

  @JsfProperty({
    type: 'boolean',
    title: 'Done?',
    default: false,
  })
  declare done: boolean
}

export class Nested {
  @JsfProperty({
    type: 'string',
    title: 'Task list title',
  })
  declare title: string

  @JsfProperty({
    type: 'object',
    title: 'Tasks',
    items: [Task]
  })
  declare tasks: Task
}
