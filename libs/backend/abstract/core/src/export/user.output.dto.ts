import type { IApiOutputDto } from './api.output.dto'
import type { IAppOutputDto } from './app.output.dto'
import type { IComponentOutputDto } from './component.output.dto'
import type { IResourceOutputDto } from './resource.output.dto'

export type IUserOutputDto = IApiOutputDto & {
  apps: Array<IAppOutputDto>
  resources: Array<IResourceOutputDto>
  components: Array<IComponentOutputDto>
}
