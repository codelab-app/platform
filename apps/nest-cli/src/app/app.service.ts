import { CodelabLogger } from '@codelab/backend/infra/adapter/logger'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello API' }
  }
}
