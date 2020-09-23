import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { APIConfiguration } from '@codelab/api-config'

@Injectable()
export class AppService {
  constructor(private readonly config: ConfigService<APIConfiguration>) {}

  getData(): { message: string } {
    return {
      message: `Welcome to api ${this.config.get<number>('port')}`,
    }
  }
}
