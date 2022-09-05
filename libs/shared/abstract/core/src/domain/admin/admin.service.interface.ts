import { ExecuteCommandResponse } from '@codelab/shared/abstract/codegen'
import { Nullish } from '@codelab/shared/abstract/types'
import { IModalService } from '../../service'
import { IExecuteCommandDTO } from './admin.dto.interface'

export interface IAdminService {
  resetData(): Promise<Nullish<boolean>>
  executeCommandModal: IModalService
  executeCommand(data: IExecuteCommandDTO): Promise<ExecuteCommandResponse>
}
